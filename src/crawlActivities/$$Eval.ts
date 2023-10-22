import { EvaluateFuncWith, NodeFor, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class $$EvalActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask<
        Selector extends string,
        Params extends unknown[],
        Func extends EvaluateFuncWith<
            Array<NodeFor<Selector>>,
            Params
        > = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>
    >(options: {
        selector: Selector;
        pageFunction: Func | string;
        args: Params;
    }) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, pageFunction, args } = this.taskOptions;
            return this.page!.$$eval(selector, pageFunction, ...args);
        });
    }
}
