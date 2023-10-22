import Activity from "../activities/Activity";
import { IActivityConfig } from "../types/activity";

export type ActivityConstructor<A extends Activity = Activity> = new (
    ctx?: any,
    ...args: any[]
) => A;

export interface IFactoryConfigValue extends IFactoryP$HConfigValue {
    _class_: ActivityConstructor;
}

interface PropertyConfig<T = any> {
    name: string;
    default?: any | (() => any);
    init?: (v: T) => T;
}

export type PropertyConfigItem = PropertyConfig | string;

export interface IFactoryHandlerParams<A extends Activity = Activity>
    extends IFactoryParamsPropertyConfig {
    config: IActivityConfig;
    activity?: A;
    globalContext: any;
    factory: {
        create: (
            props: IActivityConfig,
            globalContext?: any
        ) => Activity<any, any>;
        createChildren: (
            props: IActivityConfig[],
            globalContext?: any
        ) => Activity<any, any>[];
    };
}

export interface IFactoryHandler {
    (paramObject: IFactoryHandlerParams): void;
}

export interface IFactoryHandlerConfig {
    init?: IFactoryHandler;
    before?: IFactoryHandler;
    after?: IFactoryHandler;
}

export interface IFactoryParamsPropertyConfig {
    properties?: PropertyConfigItem[];
    params?: PropertyConfigItem[];
    buildParams?: PropertyConfigItem[];
}

export type IFactoryP$HConfigValue = IFactoryParamsPropertyConfig &
    IFactoryHandlerConfig;

