import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class CreateVariableActivity<C = any> extends Activity<C, any> {
    buildTask(name: string, value: any) {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(name,paramObj) as string;
            const rValue = this.replaceVariable(value, paramObj);
            this.globalVariables[rName] = rValue;
        }
    }
}


