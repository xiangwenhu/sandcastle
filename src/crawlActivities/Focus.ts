import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type FocusTaskOptions = string;

export default class FocusActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    FocusTaskOptions
> {
    buildTask(options: string) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.focus(this.taskOptions!);
        });
    }
}
