import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class WaitForNavActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(options: WaitForOptions) {
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.waitForNavigation(options)
        }
    }
}