import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class GoBackActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask(options?: WaitForOptions | undefined) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page?.goBack(options)
        }
    }
}