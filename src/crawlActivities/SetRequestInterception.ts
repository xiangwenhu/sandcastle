import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export interface SetRequestInterceptionActivityOptions {
    value: boolean;
}

export default class SetRequestInterceptionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetRequestInterceptionActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.setRequestInterception(options.value)
        })
    }
}