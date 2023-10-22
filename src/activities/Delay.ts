import { isString } from "lodash";
import Activity from "./Activity";
import { IActivityRunParams } from "../types/activity";

export interface  DelayTaskOptions {
     timeout: number;
}

export default class DelayActivity<C = any, R = any> extends Activity<
    C,
    R,
    DelayTaskOptions
> {

    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const tt = isString(this.taskOptions.timeout)
                ? (this.replaceVariable(this.taskOptions.timeout, paramObj))
                : this.taskOptions.timeout;
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(paramObj.$preRes);
                }, tt as number);
            });
        };
    }
}
