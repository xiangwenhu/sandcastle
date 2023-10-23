import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type GoBackActivityOptions = WaitForOptions | undefined;

export default class GoBackActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GoBackActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.goBack(this.options);
        });
    }
}
