import { EvaluateFuncWith } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export interface $EvalActivityOptions {
    selector: string;
    pageFunction: string | EvaluateFuncWith<Element, any[]>
    args: any[];
}

export default class $EvalActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    $EvalActivityOptions
> {
    buildTask() {
        return (this.task = (..._args: any[]) => {
            const { selector, pageFunction, args } = this.options;
            return this.page!.$eval(selector, pageFunction, ...args);
        });
    }
}
