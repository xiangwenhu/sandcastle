import { WaitForSelectorOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class WaitForSelectorActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(selector: string, options?: WaitForSelectorOptions) {
        return this.task = (paramObject: IActivityRunParams) => {
            return this.page!.waitForSelector(selector, options)
        }
    }
}