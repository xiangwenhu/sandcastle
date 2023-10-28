import * as uuid from "uuid";
import Activity from "./Activity";
import { ExtendParams, GlobalActivityContext, IActivityExecuteParams, IActivityRunParams, IActivityTaskFunction } from "../types/activity";
import { EnumActivityStatus } from "../types/enum";
import { firstToLower } from "../util";
import { GlobalBuiltInObject } from "../types/factory";
import { createTaskExecuteDefaultParams, createTaskRunDefaultParams } from "./util";
import { GLOBAL_BUILTIN, GLOBAL_MESSENGER, GLOBAL_VARIABLES } from "../const"
import Messenger from "../messenger";

class ActivityBase<C = any, R = any, O = any,
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
>  {
    get messenger(): Messenger | undefined {
        return this.globalCtx[GLOBAL_MESSENGER];
    }

    pre: Activity<C, R, O, ER, EE> | undefined = undefined;
    next: Activity<C, R, O, ER, EE> | undefined = undefined;
    before: Activity<C, R, O, ER, EE> | undefined = undefined;
    after: Activity<C, R, O, ER, EE> | undefined = undefined;

    // 是否等待活动结束执行完毕
    accessor waiting: boolean = true;

    accessor parent: Activity | undefined;
    public name: string | undefined;
    public type: string;
    #status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    get status() {
        return this.#status
    }
    set status(val: EnumActivityStatus) {
        this.#status = val;
        this.messenger?.emit("status", this.status, this);
    }


    public globalCtx: GlobalActivityContext = {};

    #task: IActivityTaskFunction<ER, EE> | undefined;
    set task(val: IActivityTaskFunction<ER, EE> | undefined) {
        this.#task = val;
        if (this.status !== EnumActivityStatus.BUILDED) {
            this.status = EnumActivityStatus.BUILDED;
        }
    }
    get task() {
        return this.#task
    }
    accessor checkStatus: boolean = true;

    protected get globalBuiltObject(): GlobalBuiltInObject {
        // @ts-ignore
        return this.globalCtx[GLOBAL_BUILTIN];
    }

    protected get defaultTaskRunParam(): IActivityRunParams<ER> {
        return createTaskRunDefaultParams() as IActivityRunParams<ER>;
    }

    protected get defaultTaskExecuteParam(): IActivityExecuteParams<ER, EE> {
        return createTaskExecuteDefaultParams() as IActivityExecuteParams<ER, EE>;
    }

    protected get globalVariables(): Record<string, any> {
        // @ts-ignore
        return this.globalCtx[GLOBAL_VARIABLES];
    }

    public accessor useParentCtx: boolean = false;

    #ctx: any = {};
    get ctx() {
        if (this.useParentCtx) {
            return this.parent?.ctx;
        }
        return this.#ctx;
    }
    set ctx(ctx: any) {
        this.#ctx = ctx;
    }

    #assert: Activity | undefined = undefined;

    get assert(): Activity | undefined {
        return this.#assert;
    }

    set assert(value: Activity | undefined) {
        this.#assert = value;
        if (value) {
            value.parent = this as unknown as Activity;
        }
    }

    #id: string;
    get id() {
        return this.#id
    }

    /**
     * 深度替换变量，默认替换一级
     */
    public accessor isDeepReplace: boolean = false;
    /**
     * 数组变量替换
     */
    public accessor isReplaceArray: boolean = false;

    constructor(ctx: C, public options: O) {
        this.#ctx = ctx || {};
        this.parent = undefined;
        this.name = undefined;
        // @ts-ignore
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.#id = uuid.v4();
        this.status = EnumActivityStatus.INITIALIZED;
    }
}

export default ActivityBase;
