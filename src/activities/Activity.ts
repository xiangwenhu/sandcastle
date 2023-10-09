import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { isFunction, isString, isBoolean } from "lodash";
import { createPromiseFunction } from "../factory/function";
import { firstToLower } from "../util";

class Activity<C = any> {
    get ctxName() {
        return "ctx";
    }

    get resName() {
        return "res";
    }

    get globalCtx() {
        return "gCtx";
    }

    public root: Activity | null;
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

    public globalContext: any;

    protected fn: Function | null;

    constructor(public context: C) {
        this.parent = null;
        this.name = null;
        this.type =
            firstToLower(this.constructor.name.replace("Activity", "")) ||
            "activity";
        this.root = null;
        this.fn = null;
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} res
     * @param {其他参数} otherParams
     */
    run(ctx: any, res: any, ...otherParams: any[]) {
        const globalContext = this.globalContext;

        if (this.status >= EnumActivityStatus.EXECUTING) {
            throw Error("活动已经执行");
        }

        if (this.status < EnumActivityStatus.BUILDED) {
            this.fn = this.build();
        }

        // 如果接受到终止命令
        if (!isFunction(this.fn)) {
            throw new ActivityError(
                "fn应该为函数，请确保先build然后再execute",
                this
            );
        }

        let realContext = this.context || ctx || {};

        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        return this.fn!
            .apply(self, [realContext, res, globalContext, ...otherParams])
            .then((res: any) => {
                this.status = EnumActivityStatus.EXECUTED;
                //XXX:: status = Exception 不是在此设置的，没法知道result的状态
                return res;
            })
            .catch((err: any) => {
                self.status = EnumActivityStatus.EXCEPTION;
                throw err;
            });
    }

    build(...args: any[]): Function {
        return () => {};
    }

    /**
     *
     * @param {代码} code
     */
    buildWithCode(code: string): Function {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        this.fn = createPromiseFunction(
            this.ctxName,
            this.resName,
            this.globalCtx,
            code
        );
        this.status = EnumActivityStatus.BUILDED;
        return this.fn;
    }
}

export default Activity;
