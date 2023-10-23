import { isString } from "lodash";
import Activity from "./Activity";
import { IActivityRunParams } from "../types/activity";

export interface  DelayActivityOptions {
     timeout: number;
}

export default class DelayActivity<C = any, R = any> extends Activity<
    C,
    R,
    DelayActivityOptions
> {

    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const tt = isString(this.options.timeout)
                ? (this.replaceVariable(this.options.timeout, paramObj))
                : this.options.timeout;
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(paramObj.$preRes);
                }, tt as number);
            });
        };
    }
}
