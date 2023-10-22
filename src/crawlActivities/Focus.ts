import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class FocusActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.focus(selector)
        }
    }
}