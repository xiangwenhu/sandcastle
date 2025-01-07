import { WaitForSelectorOptions } from "puppeteer-core";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams } from "../types/activity";

export interface WaitForSelectorActivityOptions {
    selector: string,
    options?: WaitForSelectorOptions
}

export default class WaitForSelectorActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForSelectorActivityOptions> {
    buildTask() {
        return this.task = (paramObject: IActivityExecuteParams) => {
            const { selector, options } = this.getReplacedOptions(paramObject);
            return this.page!.waitForSelector(selector, options)
        }
    }
}