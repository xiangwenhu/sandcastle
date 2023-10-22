import { isString } from "lodash";
import Activity from "./Activity";
import { IActivityRunParams } from "../types/activity";

export default class DelayActivity<C = any, R = any> extends Activity<
    C,
    R
> {

    buildTask(options: number | string) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const tt = isString(this.taskOptions)
                ? (this.replaceVariable(this.taskOptions, paramObj))
                : this.taskOptions;
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(paramObj.$preRes);
                }, tt as number);
            });
        };
    }
}
