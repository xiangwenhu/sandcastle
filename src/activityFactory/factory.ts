import _, { isString } from "lodash";
import Activity from "../activities/Activity";
import AssertActivity from "../activities/Assert";
import ContainerActivity from "../activities/ContainerActivity";
import { BaseActivityType, IActivityProps } from "../types/activity";


export type ActivityConstructor<A extends Activity = Activity> = new (ctx?: any, ...args: any[]) => A;

export interface IFactoryConfigValue extends IFactoryP$HConfigValue {
    _class_: ActivityConstructor
}

export interface IFactoryHandlerParams<A extends Activity = Activity> {
    properties?: PropertyKey[];
    params?: PropertyKey[];
    buildParams?: PropertyKey[];
    config: IActivityProps;
    activity?: A;
    globalContext: any;
    factory: {
        create: typeof create,
        createChildren: typeof createChildren
    }
}

export interface IFactoryHandler {
    (paramObject: IFactoryHandlerParams): void
}

export interface IFactoryHandlerConfig {
    init?: IFactoryHandler;
    before?: IFactoryHandler;
    after?: IFactoryHandler;
}

export interface IFactoryP$HConfigValue extends IFactoryHandlerConfig {
    properties?: PropertyKey[];
    params?: PropertyKey[];
    buildParams?: PropertyKey[];
}

const configMap = new Map<string, IFactoryConfigValue>();

export function register<A extends ActivityConstructor>(
    type: BaseActivityType | string,
    _class_: A,
    phConfig: IFactoryP$HConfigValue = {},
) {
    configMap.set(type, {
        _class_,
        ...phConfig
    });
}

export function create(props: IActivityProps, globalContext: any = {}) {
    return createSingle(props, globalContext);
}

export function createChildren(props: IActivityProps[], globalContext: any = {}) {
    return props.map(p => createSingle(p, globalContext))
}

const BUILTIN_PARAMS: PropertyKey[] = ["context"];
const BUILTIN_PROPERTIES: PropertyKey[] = ["name", "type"];

function getParams(factoryConfig: IFactoryConfigValue, config: IActivityProps): any[] {
    const keys: PropertyKey[] = !factoryConfig.params ? BUILTIN_PARAMS : BUILTIN_PARAMS.concat(factoryConfig.params || []);
    return keys.map(key => _.get(config, key))
}

function getBuildParams(factoryConfig: IFactoryConfigValue, config: IActivityProps): any[] {
    const keys: PropertyKey[] = factoryConfig?.buildParams || [];
    return keys.map(key => _.get(config, key))
}

function getProperties(factoryConfig: IFactoryConfigValue, config: IActivityProps): Record<PropertyKey, any> {
    const keys: PropertyKey[] = !factoryConfig.properties ? BUILTIN_PROPERTIES : BUILTIN_PROPERTIES.concat(config.properties || []);
    return keys.reduce((obj: Record<PropertyKey, any>, cur: PropertyKey) => {
        obj[cur] = _.get(config, cur)
        return obj;
    }, {})
}

function createSingle<A extends Activity>(config: IActivityProps, globalContext: any = {}) {
    const type = config.type;
    const factoryConfig = configMap.get(type);
    if (factoryConfig == undefined) {
        throw new Error(`不存在type为 ${type} 的配置`)
    }
    const paramsObject: IFactoryHandlerParams<A> = {
        config: config,
        activity: undefined,
        globalContext,
        factory: {
            create,
            createChildren
        }
    };
    const { before, after, assert } = config;
    const { before: beforeHandler, after: afterHandler, init } = factoryConfig;

    if (_.isFunction(init)) {
        init.call(null, paramsObject);
    }
    const { _class_: ClassConstructor } = factoryConfig;

    const params = getParams(factoryConfig, config);
    const properties = getProperties(factoryConfig, config);

    const activity = new ClassConstructor(...params);
    activity.globalCtx = globalContext;
    Object.assign(activity, properties);
    paramsObject.activity = activity as A;

    // 创建children
    if (Array.isArray(config.children)) {
        (activity as ContainerActivity).children = createChildren(config.children, globalContext);
    }
    if (before) {
        activity.before = isString(before) ? createSingle({
            type: "code",
            code: before,
            name: `${config.name} before`
        }, globalContext) : createSingle(before, globalContext);
    }
    // 创建after
    if (after) {
        activity.after = isString(after) ? createSingle({
            type: "code",
            code: after,
            name: `${config.name} after`
        }, globalContext) : createSingle(after, globalContext);
    }
    // assert
    if (assert) {
        activity.assert = (isString(config.assert) ? createSingle({
            type: "assert",
            code: config.assert,
            name: `${config.name} after`,
        }, globalContext) as Activity : createSingle(assert as IActivityProps, globalContext)) as AssertActivity;
    }

    if (_.isFunction(beforeHandler)) {
        beforeHandler.call(null, paramsObject)
    }

    const buildParams = getBuildParams(factoryConfig, config);
    activity.build(...buildParams);

    if (_.isFunction(afterHandler)) {
        afterHandler.call(null, paramsObject)
    }
    return activity as A;
}