import { isBoolean, isString } from "lodash";
import { ActivityError, TerminateError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { createPromiseFunction } from "../factory/function";
import {
    BaseActivityType,
    GK_TERMINATED,
    GK_TERMINATED_MESSAGE,
    GlobalActivityContext,
} from "../types/activity";
import { firstToLower } from "../util";
import { replaceVariable } from "./util/variable";

class Activity<C = any, R = any> {
    pre: Activity | null = null;

    next: Activity | null = null;

    before: Activity | null = null;

    after: Activity | null = null;
    /**
     * 父节点
     */
    accessor parent: Activity | null;
    /**
     * name
     */
    public name: string | null;
    /**
     * 类型
     */
    public type: BaseActivityType;
    /**
     * 状态
     */
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalCtx: GlobalActivityContext = {};

    protected task: Function | null;

    accessor checkStatus: boolean = true;

    constructor(public ctx: C) {
        this.parent = null;
        this.name = null;
        // @ts-ignore
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.task = null;
    }

    protected async runBefore(
        _ctx: any = this.ctx,
        _preRes: any = undefined,
        _gCtx = this.globalCtx,
        _parent: any = this.parent,
        _res: any = undefined,
        _extra: any = {}
    ) {
        if (!this.before || !(this.before instanceof Activity)) {
            return
        }
        await this.before.task?.apply(this.before, arguments);
    }


    protected async runAfter(
        _ctx: any = this.ctx,
        _preRes: any = undefined,
        _gCtx = this.globalCtx,
        _parent: any = this.parent,
        _res: any = undefined,
        _extra: any = {}
    ) {
        if (!this.after || !(this.after instanceof Activity)) {
            return
        }
        await this.after.task?.apply(this.after, arguments)
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} preRes
     * @param {其他参数} otherParams
     */
    async run(
        ctx: any = {},
        preRes: any = undefined,
        extra: any = {}
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

        let mContext = Object.assign({}, ctx || {}, this.ctx || {});
        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        try {

            const beforeArgsList = [mContext, preRes, globalCtx, this.parent, undefined, extra];
            // 执行前
            await this.runBefore.apply(self, beforeArgsList as any);

            const res: R = await this.task!.apply(self, beforeArgsList as any);
            this.status = EnumActivityStatus.EXECUTED;
            // 执行后
            await this.runAfter.apply(self, [mContext, preRes, globalCtx, this.parent, res, extra]);

            if (this.type == "terminate") {
                globalCtx[GK_TERMINATED] = true;
                globalCtx[GK_TERMINATED_MESSAGE] = res as string;
                // 执行后
                throw new TerminateError(res as string, this);
            }
            return res;
        } catch (err) {
            self.status = EnumActivityStatus.EXCEPTION;
            throw err;
        }
    }

    public buildTask(..._args: any[]): Function {
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
    protected buildWithCode(code: string): Function {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        this.task = createPromiseFunction(
            "ctx",    // 上下文
            "preRes", // 上一个活动执行后的 res
            "gCtx",   // 全局上下文
            "parent", // 父活动
            "res",    // 当前Activity之后的res
            "extra",  // 其他的参数
            code
        );
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }

    replaceVariable<C>(
        config: string | Record<string, any>,
        ctx?: any,
        preRes?: any
    ) {
        return replaceVariable(config).apply(this, [
            ctx || this.ctx || {},
            preRes,
            this.globalCtx,
            this.parent,
        ]) as C;
    }

    getProperty<P = any>(
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
}

export default Activity;
