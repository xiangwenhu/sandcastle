import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type GoForwardTaskOptions = WaitForOptions | undefined;

export default class GoForwardActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, GoForwardTaskOptions> {
    constructor(ctx: C) {
        super(ctx);
    }

    buildTask(options?: GoForwardTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.goForward(this.taskOptions);
        });
    }
}
