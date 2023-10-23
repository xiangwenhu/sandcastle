import { IActivityRunParams } from "../types/activity";
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
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, values } = this.options!;
            return this.page!.select(selector, ...values);
        });
    }
}
