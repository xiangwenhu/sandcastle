import PageChildActivity from "./PageChildActivity";

export default class EvaluateActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    protected buildTask(code: string, ...args: any[]): Function {
        return (ctx: C, preRes: any = undefined, ..._otherParams: any[]) => {
            // 替换code变量
            const rCode = this.replaceVariable(code, ctx, preRes) as string;
            // 替换参数变量
            const rArgs = args.map(arg => this.replaceVariable(arg, ctx, preRes))
            return this.page?.evaluate((_code, ..._args) => {
                const f = new Function(_code);
                return f(..._args)
            }, rCode, ...rArgs)
        }
    }
}