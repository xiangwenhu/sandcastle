import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type WaitForNavigationActivityOptions =WaitForOptions

export default class WaitForNavigationActivity<
C = any,
R = any
> extends PageChildActivity<C, R, WaitForNavigationActivityOptions> {

    buildTask() {
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.waitForNavigation(this.options)
        }
    }
}