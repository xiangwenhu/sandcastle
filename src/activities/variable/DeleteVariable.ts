import { registerActivity } from "../../activityFactory/factory";
import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";

export interface DeleteVariableActivityOptions {
    name: string;
}

@registerActivity("v.delete")
export default class DeleteVariableActivity<C = any> extends Activity<C, any, DeleteVariableActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { name } = this.getReplacedOptions(paramObj);
            this.globalBuiltInCtx.removeVariable(name);
        };
    }
}
