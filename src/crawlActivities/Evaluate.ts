import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class EvaluateActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask(code: string, ...args: any[]) {
        return this.task = (paramObj: IActivityRunParams)  => {
            // 替换code变量
            const rCode = this.replaceVariable(code, paramObj) as string;
            // 替换参数变量
            const rArgs = args.map(arg => this.replaceVariable(arg, paramObj))
            return this.page?.evaluate((_code, ..._args) => {
                const f = new Function(_code);
                return f(..._args)
            }, rCode, ...rArgs)
        }
    }
}