import { isBoolean, isString } from "lodash";
import { ActivityError, TerminateError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { createOneParamAsyncFunction } from "../factory/function";
import {
    BaseActivityType,
    GK_TERMINATED,
    GK_TERMINATED_MESSAGE,
    GlobalActivityContext,
    IActivityRunParams,
    IActivityExecuteParams,
    IActivityTaskFunction,
    ExtendParams,
} from "../types/activity";
import { firstToLower } from "../util";
import { replaceVariable } from "./util/variable";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
import { GlobalBuiltInObject } from "../types/factory";
import {
    createTaskExecuteDefaultParams,
    createTaskRunDefaultParams,
} from "./util";
import _ from "lodash";

/**
 * C context
 * R res
 * O options
 * E taskOptions 的宽展
 */
class Activity<C = any, R = any, O = any, 
ER extends ExtendParams = {},
EE extends ExtendParams = {}
> {
    pre: Activity | undefined = undefined;
    next: Activity | undefined = undefined;
    before: Activity | undefined = undefined;
    after: Activity | undefined = undefined;

    accessor parent: Activity | undefined;
    public name: string | undefined;
    public type: BaseActivityType;
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalCtx: GlobalActivityContext = {};
    public task: IActivityTaskFunction<ER, EE> | undefined;

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

    constructor(ctx: C, public options: O) {
        this.#ctx = ctx || {};
        this.parent = undefined;
        this.name = undefined;
        // @ts-ignore
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.task = undefined;
    }

    protected runBefore(paramObject: IActivityExecuteParams<ER,EE>): unknown {
        if (!this.before || !(this.before instanceof Activity)) {
            return;
        }
        return this.before.run(paramObject);
    }

    protected runAfter(paramObject: IActivityExecuteParams<ER,EE>): unknown {
        if (!this.after || !(this.after instanceof Activity)) {
            return;
        }
        return this.after.run(paramObject);
    }

    protected async runAssert(paramObject: IActivityExecuteParams<ER,EE>) {
        if (!this.assert || !(this.assert instanceof Activity)) {
            return true;
        }
        const res = await this.assert.run(paramObject);
        return !!res;
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} preRes
     * @param {其他参数} otherParams
     */
    async run(
        paramsObject: IActivityRunParams<ER> = this
            .defaultTaskRunParam as IActivityRunParams<ER>
    ) {
        const globalCtx = this.globalCtx;
        // 如果已经终止
        if (globalCtx[GK_TERMINATED]) {
            return;
        }

        // TODO::
        // if (this.checkStatus && this.status >= EnumActivityStatus.EXECUTING) {
        //     throw new ActivityError("活动已经执行", this);
        // }

        if (this.status < EnumActivityStatus.BUILDED) {
            this.buildTask(this.options);
        }

        let mContext = this.ctx || {};
        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        try {
            const gb = this.globalBuiltObject;

            const extraExecuteParams = this.getExtraExecuteParams();
            const argObject: IActivityExecuteParams<ER,EE> = {
                $gCtx: globalCtx,
                $ctx: mContext,
                $c: gb.properties.properties,
                $m: gb.methods.properties,
                $v: this.globalVariables,
                $parent: this.parent,
                $res: undefined,
                $a: gb.activities.properties,
                ...paramsObject,
                ...extraExecuteParams
            };

            const needRun = await this.runAssert(argObject);
            if (!needRun) {
                return paramsObject.$preRes;
            }

            // 执行前
            await this.runBefore.call(self, argObject);

            const res: R = await this.task!.call(self, argObject);
            this.status = EnumActivityStatus.EXECUTED;
            // 执行后
            argObject.$preRes = res;
            const afterRes = await this.runAfter.call(self, argObject);

            if (this.type == "terminate") {
                globalCtx[GK_TERMINATED] = true;
                globalCtx[GK_TERMINATED_MESSAGE] = res as string;
                // 执行后
                throw new TerminateError(res as string, this as any as Activity);
            }
            return res === undefined ? afterRes : res;
        } catch (err) {
            self.status = EnumActivityStatus.EXCEPTION;
            throw err;
        }
    }

    getExtraExecuteParams(): EE {
        return {} as EE;
    }

    buildTask(
        ...args: any[]
    ): IActivityTaskFunction<ER, EE> {
        return () => {};
    }

    build(...args: any[]) {
        this.status = EnumActivityStatus.BUILDING;
        this.task = this.buildTask(...args) as unknown as IActivityTaskFunction<ER, EE>;
        this.status = EnumActivityStatus.BUILDED;
    }

    protected replaceVariable<C = any>(
        config: C,
        paramObj: IActivityRunParams<ER>
    ) {
        if (config == undefined || Array.isArray(config)) {
            return config as C;
        }
        const gb = this.globalBuiltObject;
        let mContext = this.ctx || {};

        const extraExecuteParams = this.getExtraExecuteParams();

        const paramObject: IActivityExecuteParams<ER,EE> = {
            $gCtx: this.globalCtx,
            $ctx: mContext,
            $c: gb.properties.properties,
            $m: gb.methods.properties,
            $v: this.globalVariables,
            $parent: this.parent,
            $res: undefined,
            $a: gb.activities.properties,
            ...paramObj,
            ...extraExecuteParams
        };

        return replaceVariable(config).call(this, paramObject) as C;
    }

    protected getProperty<P = any>(
        property: PropertyKey,
        recurse: boolean = false
    ): undefined | P {
        const context: any = this;
        if (context == null) {
            return undefined;
        }
        // TODO:: hasOwn ??
        const val = context[property];
        if (!recurse) {
            return val as P;
        }
        if (val !== undefined) {
            return val;
        }
        return this.getProperty.call(this.parent, property, recurse) as P;
    }

    getClosestParent<A = Activity>(targetActivity: Object): A | undefined {
        let act: Activity<any, any, any, any, any> | undefined = this;

        while (act != undefined) {
            if (act instanceof (targetActivity as any as Function)) {
                return act as A;
            }
            act = act.parent;
        }
        return undefined;
    }
}

export default Activity;
