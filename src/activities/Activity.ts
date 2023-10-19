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
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
import { GlobalBuiltInObject } from "../types/factory";

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

    protected get globalBuiltObject(): GlobalBuiltInObject {
        // @ts-ignore
        return this.globalCtx[GLOBAL_BUILTIN]
    }

    protected get globalVariables(): Record<string, any> {
        // @ts-ignore
        return this.globalCtx[GLOBAL_VARIABLES]
    }

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
        _gCtx = this.globalCtx,
        _ctx: any = this.ctx,
        _$c: Record<string, any> = {},
        _$m: Record<string, Function> = {},
        _$v: Record<string, any>,
        _parent: any = this.parent,
        _preRes: any = undefined,
        _res: any = undefined,
        _extra: any = {}
    ) {
        if (!this.before || !(this.before instanceof Activity)) {
            return
        }
        await this.before.task?.apply(this.before, arguments);
    }


    protected async runAfter(
        _gCtx = this.globalCtx,
        _ctx: any = this.ctx,
        _$c: Record<string, any> = {},
        _$m: Record<string, Function> = {},
        _$v: Record<string, any>,
        _parent: any = this.parent,
        _preRes: any = undefined,
        _res: any = undefined,
        _extra: any = {}
    ) {
        if (!this.after || !(this.after instanceof Activity)) {
            return
        }
        return this.after.task?.apply(this.after, arguments)
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
            const gb = this.globalBuiltObject;
            const argsList = [
                globalCtx, mContext, gb.properties.properties, gb.methods.properties,
                this.globalVariables, this.parent, preRes, undefined, extra
            ];
            // 执行前
            await this.runBefore.apply(self, argsList as any);

            const res: R = await this.task!.apply(self, argsList as any);
            this.status = EnumActivityStatus.EXECUTED;
            // 执行后
            argsList[6] = res;
            const afterRes = await this.runAfter.apply(self, argsList as any);

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
        const g = this.globalBuiltObject;
        const $c = g.properties.placeholder || "$c";
        const $m = g.methods.placeholder || "$m";
        this.task = createPromiseFunction(
            code,
            "gCtx",    // 全局上下文
            "ctx",     // 上下文
            $c,        // 内置变量
            $m,        // 内置方法
            "$v",
            "parent",  // 父节点
            "preRes",  // 上一个活动的返回值
            "res",     // 本活动执行完毕的返回值
            "extra",   // 额外的参数
        );
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }

    replaceVariable<C>(
        config: string | Record<string, any>,
        ctx: any = {},
        preRes: any = undefined,
        extra: any = {}
    ) {
        const gb = this.globalBuiltObject;
        let mContext = Object.assign({}, ctx || {}, this.ctx || {});
        const argsList = [
            this.globalCtx, mContext, gb.properties.properties, gb.methods.properties,
            this.globalVariables, this.parent, preRes, undefined, extra
        ];
        return replaceVariable(config).apply(this, argsList) as C;
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

    getClosestParent<A>(targetActivity: Object) {
        let act: Activity | null = this;

        while (act != null) {
            if (act instanceof (targetActivity as any as Function)) {
                return act as A;
            }
            act = act.parent;
        }
        return undefined;
    }
}

export default Activity;
