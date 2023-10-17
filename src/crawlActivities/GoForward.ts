import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class GoForwardActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    protected buildTask(options?: WaitForOptions | undefined): Function {
        return (..._args: any[]) => {
            return this.page?.goForward(options)
        }
    }
}