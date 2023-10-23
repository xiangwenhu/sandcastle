import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";
import { EvaluateFuncWith } from "puppeteer";

export interface $$EvalActivityOptions {
    selector: string;
    pageFunction: string | EvaluateFuncWith<Element[], any[]>
    args: any[];
}

export default class $$EvalActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    $$EvalActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, pageFunction, args } = this.options;
            return this.page!.$$eval(selector, pageFunction, ...args);
        });
    }
}
