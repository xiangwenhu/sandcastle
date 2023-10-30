import { get, has, isFunction, isString } from "lodash";
import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";
import { ActivityType, IActivityConfig } from "../types/activity";
import { firstToLower } from "../util";
import {
    ActivityConstructor,
    IFactoryConfigValue,
    IFactoryHandlerParams,
    IFactoryP$HConfigValue,
    PropertyConfigItem,
} from "./factory.type";

const configMap = new Map<string, IFactoryConfigValue>();

export function register<A extends ActivityConstructor>(
    type: ActivityType | string,
    _class_: A,
    phConfig: IFactoryP$HConfigValue = {}
) {
    configMap.set(type, {
        _class_,
        ...phConfig,
    });
}

export function registerClass<A extends ActivityConstructor>(
    type?: string,
    phConfig: IFactoryP$HConfigValue = {}
) {
    return function (target: A, context: ClassDecoratorContext<any>) {
        if (context.kind !== "class") {
            throw new Error("classDecorator 只能用于装饰class");
        }

        if (!isFunction(target)) {
            throw new Error("target 必须是继承Activity的class");
        }
        const ttType =
            type || firstToLower(target.name.replace("Activity", ""));

        context.addInitializer(function () {
            configMap.set(ttType, {
                _class_: target,
                ...phConfig,
            });
        });
    };
}

export function create(props: IActivityConfig, globalContext: any = {}) {
    return createSingle(props, globalContext);
}

export function createChildren(
    props: IActivityConfig[],
    globalContext: any = {}
) {
    return props.map((p) => createSingle(p, globalContext));
}

const BUILTIN_PARAMS: PropertyConfigItem[] = [
    {
        name: "context",
        default: {},
    },
    {
        name: "options",
        default: {},
    },
];
const BUILTIN_BUILD_PARAMS: PropertyConfigItem[] = [];
const BUILTIN_PROPERTIES: PropertyConfigItem[] = [
    "name",
    "type",
    { name: "useParentCtx", default: false },
    {
        name: "eOptions",
        default: {},
    },
    {
        name: "deepReplace",
        toName: "isDeepReplace",
        default: false,
    },
    {
        name: "replaceArray",
        toName: "isReplaceArray",
        default: false,
    },
];

function getPropertyValue(
    actConfig: IActivityConfig,
    pConfig: PropertyConfigItem
) {
    if (!pConfig || !actConfig) {
        return undefined;
    }
    const ppConfig: PropertyConfigItem = isString(pConfig)
        ? { name: pConfig }
        : pConfig;

    // 不存值，使用默认值
    if (!has(actConfig, ppConfig.name)) {
        return isFunction(ppConfig.default)
            ? ppConfig.default()
            : ppConfig.default;
    } else {
        // 值转换
        const val = get(actConfig, ppConfig.name);
        return isFunction(ppConfig.init) ? ppConfig.init(val) : val;
    }
}

/**
 * 获取构造参数
 * @param factoryConfig
 * @param actConfig
 * @returns
 */
function getParams(
    factoryConfig: IFactoryConfigValue,
    actConfig: IActivityConfig
): any[] {
    const keys: PropertyConfigItem[] = !factoryConfig.params
        ? BUILTIN_PARAMS
        : BUILTIN_PARAMS.concat(factoryConfig.params || []);
    return keys.map((key) => getPropertyValue(actConfig, key));
}

/**
 * 获取build调用时的参数
 * @param factoryConfig
 * @param actConfig
 * @returns
 */
function getBuildParams(
    factoryConfig: IFactoryConfigValue,
    actConfig: IActivityConfig
): any[] {
    const keys: PropertyConfigItem[] = !factoryConfig.buildParams
        ? BUILTIN_BUILD_PARAMS
        : BUILTIN_BUILD_PARAMS.concat(factoryConfig.buildParams || []);
    return keys.map((key) => getPropertyValue(actConfig, key));
}

/**
 * 获取属性赋值
 * @param factoryConfig
 * @param actConfig
 * @returns
 */
function getProperties(
    factoryConfig: IFactoryConfigValue,
    actConfig: IActivityConfig
): Record<PropertyKey, any> {
    const keys: PropertyConfigItem[] = BUILTIN_PROPERTIES;
    return keys.reduce(
        (obj: Record<PropertyKey, any>, cur: PropertyConfigItem) => {
            const key = isString(cur) ? cur : cur.name;
            const toKey = isString(cur) ? cur : cur.toName || cur.name;
            // @ts-ignore
            obj[toKey] = actConfig[key];
            return obj;
        },
        {}
    );
}

function createMaybeCodeActivity({
    actConfig,
    name,
    globalContext,
    addReturn,
}: {
    addReturn?: boolean;
    actConfig: string | IActivityConfig<any, any>;
    name: string;
    globalContext: any;
}) {
    return isString(actConfig)
        ? createSingle(
              {
                  type: "code",
                  options: {
                      code: addReturn ? `return ${actConfig}` : actConfig,
                  },
                  name: `${name}`,
                  useParentCtx: true,
              },
              globalContext
          )
        : createSingle(actConfig, globalContext);
}

function createSingle<A extends Activity>(
    actConfig: IActivityConfig,
    globalContext: any = {}
) {
    const type = actConfig.type;
    const factoryConfig = configMap.get(type);
    if (factoryConfig == undefined) {
        throw new Error(`不存在type为 ${type} 的配置`);
    }
    const paramsObject: IFactoryHandlerParams<A> = {
        config: actConfig,
        activity: undefined,
        globalContext,
        factory: {
            create,
            createChildren,
        },
    };
    const { before, after, assert } = actConfig;
    const { before: beforeHandler, after: afterHandler, init } = factoryConfig;

    if (isFunction(init)) {
        init.call(null, paramsObject);
    }
    const { _class_: ClassConstructor } = factoryConfig;

    const params = getParams(factoryConfig, actConfig);
    const properties = getProperties(factoryConfig, actConfig);

    const activity = new ClassConstructor(...params);
    activity.globalCtx = globalContext;
    Object.assign(activity, properties);
    paramsObject.activity = activity as A;

    // 创建children
    if (Array.isArray(actConfig.children)) {
        (activity as ContainerActivity).children = createChildren(
            actConfig.children,
            globalContext
        );
    }
    // 创建before
    before &&
        (activity.before = createMaybeCodeActivity({
            actConfig: before,
            globalContext,
            name: `${actConfig.name} before`,
        }));

    // 创建after
    after &&
        (activity.after = createMaybeCodeActivity({
            actConfig: after,
            globalContext,
            name: `${actConfig.name} after`,
        }));
    // assert
    assert &&
        (activity.assert = createMaybeCodeActivity({
            actConfig: assert,
            globalContext,
            name: `${actConfig.name} assert`,
            addReturn: true,
        }));

    if (isFunction(beforeHandler)) {
        beforeHandler.call(null, paramsObject);
    }

    const buildParams = getBuildParams(factoryConfig, actConfig);
    // activity.build(...buildParams);
    activity.build.bind(activity, ...buildParams);

    if (isFunction(afterHandler)) {
        afterHandler.call(null, paramsObject);
    }

    //TODO:: Proxy限制访问的属性
    if (isString(actConfig.toVariable) && actConfig.toVariable.trim() !== "") {
        const name = actConfig.toVariable.trim();
        activity.globalBuiltInCtx.addActivityReference(name, activity);
    }

    return activity as A;
}

export const factory = {
    create,
    createChildren,
};

export function use(
    fn: (useFnOptions: {
        factory: typeof factory;
        register: typeof register;
    }) => void
) {
    fn.call(null, {
        factory,
        register,
    });
}
