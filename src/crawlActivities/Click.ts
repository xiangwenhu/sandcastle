import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class ClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.click(selector)
        }
    }
}