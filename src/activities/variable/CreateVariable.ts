import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export interface CreateVariableTaskOptions {
    name: string;
    value: any;
}

export default class CreateVariableActivity<C = any> extends Activity<C, any, CreateVariableTaskOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(
                this.taskOptions.name,
                paramObj
            ) as string;
            const rValue = this.replaceVariable(
                this.taskOptions.value,
                paramObj
            );
            this.globalVariables[rName] = rValue;
        };
    }
}
