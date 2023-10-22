import _, { isFunction, isNumber, isString, isSymbol } from "lodash";
import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";
import { BaseActivityType, IActivityConfig } from "../types/activity";
import {
    ActivityConstructor,
    IFactoryConfigValue,
    IFactoryHandlerParams,
    IFactoryP$HConfigValue,
    PropertyConfigItem,
} from "./factory.type";
import { GLOBAL_BUILTIN } from "../const";
import { GlobalBuiltInObject } from "../types/factory";

const configMap = new Map<string, IFactoryConfigValue>();

export function register<A extends ActivityConstructor>(
    type: BaseActivityType | string,
    _class_: A,
    phConfig: IFactoryP$HConfigValue = {}
) {
    configMap.set(type, {
        _class_,
        ...phConfig,
    });
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

const BUILTIN_PARAMS: PropertyConfigItem[] = ["context"];
const BUILTIN_PROPERTIES: PropertyConfigItem[] = [
    "name",
    "type",
    "useParentCtx",
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
    if (!_.has(actConfig, ppConfig.name)) {
        return isFunction(ppConfig.default)
            ? ppConfig.default()
            : ppConfig.default;
    } else {
        // 值转换
        const val = _.get(actConfig, ppConfig.name);
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
    const keys: PropertyConfigItem[] = factoryConfig?.buildParams || [];
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
    const keys: PropertyConfigItem[] = !factoryConfig.properties
        ? BUILTIN_PROPERTIES
        : BUILTIN_PROPERTIES.concat(actConfig.properties || []);
    return keys.reduce((obj: Record<string, any>, cur: PropertyConfigItem) => {
        const key = isString(cur) ? cur : cur.name;
        obj[key] = _.get(actConfig, key);
        return obj;
    }, {});
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

    if (_.isFunction(init)) {
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
    if (before) {
        activity.before = isString(before)
            ? createSingle(
                  {
                      type: "code",
                      code: before,
                      name: `${actConfig.name} before`,
                  },
                  globalContext
              )
            : createSingle(before, globalContext);
    }
    // 创建after
    if (after) {
        activity.after = isString(after)
            ? createSingle(
                  {
                      type: "code",
                      code: after,
                      name: `${actConfig.name} after`,
                  },
                  globalContext
              )
            : createSingle(after, globalContext);
    }
    // assert
    if (assert) {
        activity.assert = (
            isString(actConfig.assert)
                ? (createSingle(
                      {
                          type: "code",
                          code: `return ${actConfig.assert}`,
                          name: `${actConfig.name} after`,
                          useParentCtx: true,
                      },
                      globalContext
                  ) as Activity)
                : createSingle(assert as IActivityConfig, globalContext)
        ) as Activity;
    }

    if (_.isFunction(beforeHandler)) {
        beforeHandler.call(null, paramsObject);
    }

    const buildParams = getBuildParams(factoryConfig, actConfig);
    activity.build(...buildParams);

    if (_.isFunction(afterHandler)) {
        afterHandler.call(null, paramsObject);
    }

    //TODO:: Proxy限制访问的属性
    if (
        isString(actConfig.toVariable) &&
        actConfig.toVariable.toString() !== ""
    ) {
        const g: GlobalBuiltInObject = globalContext[GLOBAL_BUILTIN];
        g.activities.properties[actConfig.toVariable.toString()] = activity;
    }

    return activity as A;
}
