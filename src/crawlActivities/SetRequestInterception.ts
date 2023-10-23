import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export interface SetRequestInterceptionActivityOptions {
    value: boolean;
}

export default class  SetRequestInterceptionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetRequestInterceptionActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setRequestInterception(this.options.value)
        }
    }
}