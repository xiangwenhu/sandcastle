import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class ReloadActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(options: WaitForOptions): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.reload(options)
        }
    }
}