import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export type WaitForNavigationActivityOptions = WaitForOptions

export default class WaitForNavigationActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForNavigationActivityOptions> {

    buildTask() {
        return this.task = (paramObject: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObject);
            return this.page!.waitForNavigation(options)
        }
    }
}