import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class SelectActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(selector: string, ...values: string[]) {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.select(selector, ...values);
        });
    }
}
