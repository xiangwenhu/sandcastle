import { EvaluateFuncWith, NodeFor, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class $$EvalActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<Array<NodeFor<Selector>>, Params> = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params) {
        return this.task = (..._args: any[]) => {
            return this.page?.$$eval(selector, pageFunction, ...args)
        }
    }
}