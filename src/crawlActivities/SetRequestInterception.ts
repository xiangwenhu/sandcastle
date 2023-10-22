import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class  SetRequestInterceptionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(value: boolean) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setRequestInterception(value)
        }
    }
}