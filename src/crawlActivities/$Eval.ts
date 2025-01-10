import { EvaluateFuncWith } from "puppeteer-core";
import { IActivityExecuteParams } from "../types/activity";
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
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { selector, pageFunction, args } = this.getReplacedOptions(paramObj)
            return this.page!.$eval(selector, pageFunction, ...args);
        });
    }
}
