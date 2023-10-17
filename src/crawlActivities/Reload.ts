import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class ReloadActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    protected buildTask(options: WaitForOptions): Function {
        return (..._args: any[]) => {
            return this.page?.reload(options)
        }
    }
}