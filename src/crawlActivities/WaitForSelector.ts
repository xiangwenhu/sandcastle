import { WaitForSelectorOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface WaitForSelectorActivityOptions {
    selector: string,
    options?: WaitForSelectorOptions
}

export default class WaitForSelectorActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForSelectorActivityOptions> {
    buildTask() {
        return this.task = (paramObject: IActivityRunParams) => {
            const { selector, options } = this.options;
            return this.page!.waitForSelector(selector, options)
        }
    }
}