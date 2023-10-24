import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type SetExtraHTTPHeadersActivityOptions = Record<string, string>;

export default class SetExtraHTTPHeadersActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetExtraHTTPHeadersActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.setExtraHTTPHeaders(options);
        })
    }
}