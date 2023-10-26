import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";

export interface DeleteVariableActivityOptions {
    name: string;
}

export default class DeleteVariableActivity<C = any> extends Activity<C, any, DeleteVariableActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { name } = this.getReplacedOptions(paramObj);
            delete this.globalVariables[name];
        };
    }
}
