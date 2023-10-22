import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";


export type ReloadTaskOptions = WaitForOptions;

export default class ReloadActivity<
C = any,
R = any
> extends PageChildActivity<C, R, ReloadTaskOptions> {

    buildTask(options: WaitForOptions) {
        this.taskOptions = options;
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.reload(this.taskOptions)
        }
    }
}