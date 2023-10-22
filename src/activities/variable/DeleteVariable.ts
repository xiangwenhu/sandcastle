import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export interface DeleteVariableTaskOptions {
    name: string;
}

export default class DeleteVariableActivity<C = any> extends Activity<C, any, DeleteVariableTaskOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(
                this.taskOptions.name,
                paramObj
            ) as string;
            delete this.globalVariables[rName];
        };
    }
}
