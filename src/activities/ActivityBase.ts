import * as uuid from "uuid";
import { GLOBAL_BUILTIN_CONTEXT } from "../const";
import { ExtendParams, GlobalActivityContext, IActivityExecuteParams, IActivityRunParams, IActivityTaskFunction } from "../types/activity";
import { EnumActivityStatus } from "../types/enum";
import { IMessenger } from "../types/messenger";
import { firstToLower } from "../util";
import Activity from "./Activity";
import { createTaskExecuteDefaultParams, createTaskRunDefaultParams } from "./util";

class ActivityBase<C = any, R = any, O = any> {

    get messenger(): IMessenger {
        return this.globalBuiltInCtx?.messenger
    }

    pre: Activity<C, R, O> | undefined = undefined;
    next: Activity<C, R, O> | undefined = undefined;
    before: Activity<C, R, O> | undefined = undefined;
    after: Activity<C, R, O> | undefined = undefined;

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

    public globalCtx: GlobalActivityContext = {} as GlobalActivityContext;

    #task: IActivityTaskFunction | undefined;
    set task(val: ((paramObject: IActivityExecuteParams) => any) | undefined) {
        this.#task = val;
        if (this.status !== EnumActivityStatus.BUILDED) {
            this.status = EnumActivityStatus.BUILDED;
        }
    }
    get task() {
        return this.#task
    }
    accessor checkStatus: boolean = true;

    get globalBuiltInCtx() {
        return this.globalCtx[GLOBAL_BUILTIN_CONTEXT];
    }

    protected get defaultTaskRunParam(): IActivityRunParams {
        return createTaskRunDefaultParams() as IActivityRunParams;
    }

    protected get defaultTaskExecuteParam(): IActivityExecuteParams {
        return createTaskExecuteDefaultParams() as IActivityExecuteParams;
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
