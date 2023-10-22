import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface SelectTaskOptions {
    selector: string;
    values: string[];
}

export default class SelectActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    SelectTaskOptions
> {
    buildTask(options: SelectTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, values } = this.taskOptions!;
            return this.page!.select(selector, ...values);
        });
    }
}
