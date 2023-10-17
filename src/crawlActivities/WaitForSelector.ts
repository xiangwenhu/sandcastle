import { WaitForSelectorOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class WaitForSelectorActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    protected buildTask(selector: string, options?: WaitForSelectorOptions): Function {
        return (..._args: any[]) => {
            return this.page?.waitForSelector(selector, options)
        }
    }
}