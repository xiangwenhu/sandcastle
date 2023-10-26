import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface $ActivityOptions {
    selector: string
};

export default class $Activity<
    C = any,
    R = any
> extends PageChildActivity<C, R, $ActivityOptions> {
    buildTask() {
        return (this.task = async (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            const res = await this.page!.$(options.selector);
            return res;
        })
    }
}