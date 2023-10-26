import { WaitForOptions } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type ReloadActivityOptions = WaitForOptions;

export default class ReloadActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ReloadActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.reload(options)
        })
    }
}