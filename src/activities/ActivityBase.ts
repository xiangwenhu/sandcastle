import * as uuid from "uuid";
import Activity from "./Activity";
import { BaseActivityType, ExtendParams, GlobalActivityContext, IActivityExecuteParams, IActivityRunParams, IActivityTaskFunction } from "../types/activity";
import { EnumActivityStatus } from "../enum";
import { firstToLower } from "../util";
import { GlobalBuiltInObject } from "../types/factory";
import { createTaskExecuteDefaultParams, createTaskRunDefaultParams } from "./util";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const"

class ActivityBase<C = any, R = any, O = any,
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> {
    pre: Activity<C, R, O, ER, EE> | undefined = undefined;
    next: Activity<C, R, O, ER, EE> | undefined = undefined;
    before: Activity<C, R, O, ER, EE> | undefined = undefined;
    after: Activity<C, R, O, ER, EE> | undefined = undefined;

    accessor parent: Activity | undefined;
    public name: string | undefined;
    public type: BaseActivityType;
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalCtx: GlobalActivityContext = {};

    #task: IActivityTaskFunction<ER, EE> | undefined;
    set task(val: IActivityTaskFunction<ER, EE> | undefined) {
        this.#task = val;
        this.status = EnumActivityStatus.BUILDED;
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

    public id: string;

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
        this.id = uuid.v4();
    }
}

export default ActivityBase;
