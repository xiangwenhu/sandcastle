import { EvaluateFuncWith, NodeFor, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class $EvalActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params) {
        return (..._args: any[]) => {
            return this.page?.$eval(selector, pageFunction, ...args)
        }
    }
}