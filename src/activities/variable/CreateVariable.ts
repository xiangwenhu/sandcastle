import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export interface CreateVariableActivityOptions {
    name: string;
    value: any;
}

export default class CreateVariableActivity<C = any> extends Activity<C, any, CreateVariableActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(
                this.options.name,
                paramObj
            ) as string;
            const rValue = this.replaceVariable(
                this.options.value,
                paramObj
            );
            this.globalVariables[rName] = rValue;
        };
    }
}
