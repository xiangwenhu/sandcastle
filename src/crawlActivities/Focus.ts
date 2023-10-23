import { IActivityRunParams } from "../types/activity";
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
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.focus(this.options.selector);
        });
    }
}
