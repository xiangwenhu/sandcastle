import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";

/**
 * 终止，可以终止的Activity:
 */
export default class BreakActivity<C = any> extends Activity<
    C,
    string
> {
    buildTask(options: string) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => Promise.resolve(this.taskOptions);
    }
}
