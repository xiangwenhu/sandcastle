import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { isFunction, isString, isBoolean } from "lodash";
import { createPromiseFunction } from "../factory/function";
import { firstToLower } from "../util";

class Activity<C = any, R = any> {
    /**
     * 上下文名
     */
    get ctxName() {
        return "ctx";
    }

    /**
    * 返回值名
    */
    get resName() {
        return "res";
    }

    get globalCtxName() {
        return "gCtx";
    }

    pre: Activity | null  = null;

    next: Activity | null  = null;

    /**
     * 父节点
     */
    public parent: Activity | null;
    /**
     * name
     */
    public name: string | null;
    /**
     * 类型
     */
    public type: string | null;
    /**
     * 状态
     */
    public status: EnumActivityStatus = EnumActivityStatus.UNINITIALIZED;

    public globalCtx: any;

    protected task: Function | null;

    constructor(public ctx: C) {
        this.parent = null;
        this.name = null;
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.task = null;
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} preRes
     * @param {其他参数} otherParams
     */
    async run(ctx: any = undefined, preRes: any = undefined, ...otherParams: any[]) {
        const globalCtx = this.globalCtx;
        if (this.status >= EnumActivityStatus.EXECUTING) {
            throw Error("活动已经执行");
        }

        if (this.status < EnumActivityStatus.BUILDED) {
            this.buildTask();
        }

        // 如果接受到终止命令
        if (!isFunction(this.task)) {
            throw new ActivityError(
                "fn应该为函数，请确保先build然后再execute",
                this
            );
        }

        let realContext = ctx || this.ctx ||  {};
        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        try {
            const res: R = await this.task!.apply(self, [realContext, preRes, globalCtx, this.parent, ...otherParams]);
            this.status = EnumActivityStatus.EXECUTED;
            return res;
        } catch (err) {
            self.status = EnumActivityStatus.EXCEPTION;
            throw err;
        }
    }

    protected buildTask(...args: any[]): Function {
        return () => { }
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
            this.ctxName,
            this.resName,
            this.globalCtxName,
            "parent",
            code
        );
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }
}

export default Activity;
