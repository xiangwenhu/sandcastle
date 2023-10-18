import { WaitForSelectorOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class WaitForSelectorActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(selector: string, options?: WaitForSelectorOptions): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.waitForSelector(selector, options)
        }
    }
}