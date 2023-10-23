import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type ReloadActivityOptions = WaitForOptions;

export default class ReloadActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ReloadActivityOptions> {

    buildTask() {
        return this.task = (paramObject: IActivityRunParams) => {
            return this.page!.reload(this.options)
        }
    }
}