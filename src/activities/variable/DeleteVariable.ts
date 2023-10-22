import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class DeleteVariableActivity<C = any> extends Activity<C, any> {
    buildTask(options: string) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(this.taskOptions, paramObj) as string;
            delete this.globalVariables[rName];
        };
    }
}
