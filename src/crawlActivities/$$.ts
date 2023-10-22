import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class $$Activity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask<Selector extends string>(options: Selector) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.$$(this.taskOptions);
        });
    }
}
