import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";


export interface BreakActivityOptions {
    message: string;
}

/**
 * 终止，可以终止的Activity:
 */
export default class BreakActivity<C = any> extends Activity<
    C,
    string,
    BreakActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityRunParams) => Promise.resolve(this.options.message);
    }
}
