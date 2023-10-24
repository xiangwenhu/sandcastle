import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export interface EvaluateClickActivityOptions {
    selector: string;
}

export default class EvaluateClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, EvaluateClickActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityExecuteParams) => {
            const { selector } = this.getReplacedOptions(paramObj);
            return this.page!.evaluate((selector) => {
                return (document.querySelector(selector) as HTMLElement)?.click()
            }, selector)
        }
    }
}