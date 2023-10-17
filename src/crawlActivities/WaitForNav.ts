import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class WaitForNavActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(options: WaitForOptions): Function {
        return (..._args: any[]) => {
            return this.page?.waitForNavigation(options)
        }
    }
}