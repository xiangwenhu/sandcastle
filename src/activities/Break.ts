import { registerActivity } from "../activityFactory/factory";
import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";

export interface BreakActivityOptions {
    message: string;
}

/**
 * 终止，可以终止的Activity:
 */
@registerActivity()
export default class BreakActivity<C = any> extends Activity<
    C,
    string,
    BreakActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            Promise.resolve(options.message);
        }
    }
}
