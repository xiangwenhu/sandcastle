import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface $$ActivityOptions {
    selector: string
};


export default class $$Activity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    $$ActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.$$(options.selector);
        });
    }
}
