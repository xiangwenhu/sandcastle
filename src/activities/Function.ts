import { isFunction } from "lodash";
import { registerActivity } from "../activityFactory/factory";
import { IActivityExecuteParams, IFunctionActivityConfig } from "../types/activity";
import Activity from "./Activity";

export interface FunctionActivityOptions {
}

@registerActivity("function", {
    after({ activity, config }) {
        const c = config as IFunctionActivityConfig;
        if (isFunction(c.task)) {
            activity!.task = c.task;
        }
    }
})
export default class FunctionActivity<C = any> extends Activity<
    C,
    string,
    FunctionActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => this.task!.call(null, paramObj)
    }
}
