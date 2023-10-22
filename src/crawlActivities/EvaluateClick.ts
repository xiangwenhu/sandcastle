import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class EvaluateClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string) {
        this.taskOptions = selector;
        return this.task = (paramObj: IActivityRunParams) => {            
            return this.page!.evaluate((selector) => {
                return (document.querySelector(selector) as HTMLElement)?.click()
            }, this.taskOptions)
        }
    }
}