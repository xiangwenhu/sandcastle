import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";

export type IActivityConfig<C = any> = {
    type: BaseActivityType | string;
    context?: C;
    name: string;
    children?: IActivityConfig[];
    before?: IActivityConfig | string | null | undefined;
    after?: IActivityConfig | string | null | undefined;
    assert?: string | IActivityConfig;
} & Record<string, any>;

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

export interface IActivityRunParams {
    $preRes: any;
    $extra: Record<PropertyKey, any>;
    $item?: any
}

export interface IActivityExecuteParams extends IActivityRunParams {
    /**
     * 上下文
     */
    $ctx: any,
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
}

export interface IActivityTaskFunction {
    (paramObject: IActivityRunParams): any;
}
