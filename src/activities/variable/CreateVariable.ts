import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class CreateVariableActivity<C = any> extends Activity<C, any> {
    buildTask(options: { name: string; value: any }) {
        this.taskOptions = options;
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
