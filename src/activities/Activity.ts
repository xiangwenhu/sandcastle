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
} from "../types/activity";
import { firstToLower } from "../util";
import { replaceVariable } from "./util/variable";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
import { GlobalBuiltInObject } from "../types/factory";
import { createTaskExecuteDefaultParams, createTaskRunDefaultParams } from "./util";
import _ from "lodash";

class Activity<C = any, R = any> {
    pre: Activity | undefined = undefined;

    next: Activity | undefined = undefined;

    before: Activity | undefined = undefined;

    after: Activity | undefined = undefined;
    /**
     * 父节点
     */
    accessor parent: Activity | undefined;
    /**
     * name
     */
    public name: string | undefined;
    /**
     * 类型
     */
    public type: BaseActivityType;
    /**
     * 状态
     */
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalCtx: GlobalActivityContext = {};

    protected task: IActivityTaskFunction | undefined;

    accessor checkStatus: boolean = true;


    protected get globalBuiltObject(): GlobalBuiltInObject {
        // @ts-ignore
        return this.globalCtx[GLOBAL_BUILTIN];
    }

    protected get defaultTaskRunParam(): IActivityRunParams {
        return createTaskRunDefaultParams();
    }

    protected get defaultTaskExecuteParam(): IActivityExecuteParams {
        return createTaskExecuteDefaultParams();
    }

    protected get globalVariables(): Record<string, any> {
        // @ts-ignore
        return this.globalCtx[GLOBAL_VARIABLES];
    }


    #ctx: any = {};

    get ctx() {
        return this.#ctx;
    }

    set ctx(ctx: any) {
        this.#ctx = ctx;
    }

    constructor(ctx: C) {
        this.#ctx = ctx || {};
        this.parent = undefined;
        this.name = undefined;
        // @ts-ignore
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.task = undefined;
    }

    protected async runBefore(paramObject: IActivityRunParams) {
        if (!this.before || !(this.before instanceof Activity)) {
            return;
        }
        await this.before.task?.call(this.before, paramObject);
    }

    protected async runAfter(paramObject: IActivityExecuteParams) {
        if (!this.after || !(this.after instanceof Activity)) {
            return;
        }
        return this.after.task?.call(this.after, paramObject);
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} preRes
     * @param {其他参数} otherParams
     */
    async run(
        { preRes, extra }: IActivityRunParams = this.defaultTaskRunParam
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
            this.buildTask();
        }

        let mContext = this.ctx || {};
        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        try {
            const gb = this.globalBuiltObject;
            const argObject: IActivityExecuteParams = {
                gCtx: globalCtx,
                ctx: mContext,
                $c: gb.properties.properties,
                $m: gb.methods.properties,
                $v: this.globalVariables,
                parent: this.parent,
                preRes,
                res: undefined,
                extra,
            };
            // 执行前
            await this.runBefore.call(self, argObject);

            const res: R = await this.task!.call(self, argObject);
            this.status = EnumActivityStatus.EXECUTED;
            // 执行后
            argObject.res = res;
            const afterRes = await this.runAfter.call(self, argObject);

            if (this.type == "terminate") {
                globalCtx[GK_TERMINATED] = true;
                globalCtx[GK_TERMINATED_MESSAGE] = res as string;
                // 执行后
                throw new TerminateError(res as string, this);
            }
            return res === undefined ? afterRes : res;
        } catch (err) {
            self.status = EnumActivityStatus.EXCEPTION;
            throw err;
        }
    }

    buildTask(..._args: any[]): IActivityTaskFunction {
        return () => { };
    }

    build(...args: any[]) {
        this.status = EnumActivityStatus.BUILDING;
        this.task = this.buildTask(...args);
        this.status = EnumActivityStatus.BUILDED;
    }

    /**
     *
     * @param {代码} code
     */
    buildWithCode(code: string): IActivityTaskFunction {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        const g = this.globalBuiltObject;
        const $c = g.properties.placeholder || "$c";
        const $m = g.methods.placeholder || "$m";
        this.task = createOneParamAsyncFunction(code, [
            "gCtx", // 全局上下文
            "ctx", // 上下文
            $c, // 内置变量
            $m, // 内置方法
            "$v",
            "parent", // 父节点
            "preRes", // 上一个活动的返回值
            "res", // 本活动执行完毕的返回值
            "extra", // 额外的参数
        ]) as IActivityTaskFunction;
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }

    protected replaceVariable<C = any>(
        config: C,
        paramObj: IActivityRunParams
    ) {
        if (config == undefined || Array.isArray(config)) {
            return config as C;
        }
        const gb = this.globalBuiltObject;
        let mContext = this.ctx || {};
        const paramObject: IActivityExecuteParams = {
            gCtx: this.globalCtx,
            ctx: mContext,
            $c: gb.properties.properties,
            $m: gb.methods.properties,
            $v: this.globalVariables,
            parent: this.parent,
            preRes: paramObj.preRes,
            res: undefined,
            extra: paramObj.extra,
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

    getClosestParent<A>(targetActivity: Object) {
        let act: Activity | undefined = this;

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
