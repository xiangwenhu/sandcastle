import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";

/**
 * 终止，可以终止的Activity:
 */
export default class BreakActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C, public message: string) {
        super(context);
    }

    buildTask(message: string) {
        this.message = message || this.message
        return (paramObj: IActivityRunParams) => Promise.resolve(this.message)
    }
}

