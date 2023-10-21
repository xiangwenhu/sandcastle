import { isString } from "lodash";
import Activity from "./Activity";
import { IActivityRunParams } from "../types/activity";

export default class DelayActivity<C = any, R = any> extends Activity<C, R> {
    constructor(context: C, private timeout: number) {
        super(context);
    }

    buildTask(timeout?: number) {
        this.timeout = timeout || this.timeout;
        return (paramObj: IActivityRunParams) => {
            const tt = isString(this.timeout) ? this.replaceVariable(this.timeout, paramObj) as number: this.timeout;
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(paramObj.$preRes);
                }, tt);
            });
        };
    }
}
