import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";

export interface IActivityConfig<C = any, O = any, E = any> {
    type: BaseActivityType | string;
    context?: C;
    name: string;
    children?: IActivityConfig[];
    before?: IActivityConfig | string | null | undefined;
    after?: IActivityConfig | string | null | undefined;
    assert?: string | IActivityConfig;
    useParentCtx?: boolean;
    toVariable?: string;
    options?: O;
    eOptions?: E;
}

export interface IfElseActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    if: IActivityConfig;
    elseif?: IActivityConfig[];
    else?: IActivityConfig;
}

export interface IFunctionActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    catch: IActivityConfig;
}

export interface IFunctionActivityConfig<C = any, O = any, E = any>
    extends IActivityConfig {
    task: IActivityTaskFunction;
}

export interface ActivityFactory<
    P extends IActivityConfig = any,
    A extends Activity = Activity | ContainerActivity
> {
    (props: P, globalContext?: any): A;
}

export interface ActivityChildrenFactory<
    P extends IActivityConfig = any,
    A extends Activity = any
> {
    (props: P[], globalContext?: any): A[];
}

export interface ActivityFactoryFactory<P extends IActivityConfig = any> {
    create: ActivityFactory<P>;
    createChildren: ActivityChildrenFactory<P>;
}

export type BaseActivityType =
    | "delay"
    | "code"
    | "sequence"
    | "parallel"
    | "race"
    | "assert"
    | "while"
    | "ifElse"
    | "request"
    | "break"
    | "terminate"
    | "tryCatch";

export type CrawlActivityType = "c.browser" | "c.page" | "c.page.getCookie";

export const GK_TERMINATED = Symbol("terminated");
export const GK_TERMINATED_MESSAGE = Symbol("terminated-message");

export interface GlobalActivityContext {
    [GK_TERMINATED]?: boolean;
    [GK_TERMINATED_MESSAGE]?: string;
}

export type ExtendParams = Record<string, any>;

export type IActivityRunParams<E extends ExtendParams = {}> = {
    $preRes: any;
    $extra: Record<PropertyKey, any>;
} & E;

export type IActivityExecuteParams<
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> = {
    /**
     * 上下文
     */
    $ctx: any;
    /**
     * 全局上下文
     */
    $gCtx: Record<PropertyKey, any>;
    /**
     * 内置常量
     */
    $c: Record<string, any>;
    /**
     * 内置方法
     */
    $m: Record<string, Function>;
    /**
     * 全局变量
     */
    $v: Record<string, any>;
    /**
     * 父节点
     */
    $parent: Activity | undefined;
    /**
     * 上一个活动的返回值
     */
    $res: any;

    $a: Record<string, Activity>;
} & EE &
    IActivityRunParams<ER>;

export interface IActivityTaskFunction<
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> {
    (paramObject: IActivityExecuteParams<ER, EE>): any;
}
