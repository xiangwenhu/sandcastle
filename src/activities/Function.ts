import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import Activity from "./Activity";

export interface FunctionActivityOptions {
}

/**
 * 终止，可以终止的Activity:
 */
export default class FunctionActivity<C = any> extends Activity<
    C,
    string,
    FunctionActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => this.task!.call(null, paramObj)
    }
}
