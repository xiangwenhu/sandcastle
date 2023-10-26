import { isString } from "lodash";
import Activity from "./Activity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface DelayActivityOptions {
    timeout: number;
}

export default class DelayActivity<C = any, R = any> extends Activity<
    C,
    R,
    DelayActivityOptions
> {

    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { timeout } = this.getReplacedOptions(paramObj)
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(paramObj.$preRes);
                }, +timeout);
            });
        };
    }
}
