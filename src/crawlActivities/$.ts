import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class $Activity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask<Selector extends string>(options: Selector) {
        this.taskOptions = options;
        return this.task = async (paramObj: IActivityRunParams) => {
            const res = await this.page!.$(this.taskOptions);
            return res;
        }
    }
}