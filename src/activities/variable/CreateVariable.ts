import { registerActivity } from "../../activityFactory/factory";
import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";

export interface CreateVariableActivityOptions {
    name: string;
    value: any;
}

@registerActivity("v.create")
export default class CreateVariableActivity<C = any> extends Activity<C, any, CreateVariableActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { name, value } = this.getReplacedOptions(paramObj);
            this.globalBuiltInCtx.addVariable(name, value);
        };
    }
}
