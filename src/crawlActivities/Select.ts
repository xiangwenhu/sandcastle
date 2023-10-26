import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface SelectActivityOptions {
    selector: string;
    values: string[];
}

export default class SelectActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    SelectActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { selector, values } = this.getReplacedOptions(paramObj);
            return this.page!.select(selector, ...values);
        });
    }
}
