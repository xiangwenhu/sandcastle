import { WaitForOptions } from "puppeteer-core";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export type GoBackActivityOptions = WaitForOptions | undefined;

export default class GoBackActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GoBackActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.goBack(options);
        });
    }
}
