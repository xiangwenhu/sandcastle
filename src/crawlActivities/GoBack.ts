import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class GoBackActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask(options?: WaitForOptions | undefined): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.goBack(options)
        }
    }
}