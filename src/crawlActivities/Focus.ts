import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type FocusActivityOptions = {
    selector: string;
};

export default class FocusActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    FocusActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { selector } = this.getReplacedOptions(paramObj);
            return this.page!.focus(selector);
        });
    }
}
