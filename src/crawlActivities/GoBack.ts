import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type GoBackTaskOptions = WaitForOptions | undefined;

export default class GoBackActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GoBackTaskOptions
> {
    buildTask(options?: GoBackTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.goBack(this.taskOptions);
        });
    }
}
