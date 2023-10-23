import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export interface DeleteVariableActivityOptions {
    name: string;
}

export default class DeleteVariableActivity<C = any> extends Activity<C, any, DeleteVariableActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(
                this.options.name,
                paramObj
            ) as string;
            delete this.globalVariables[rName];
        };
    }
}
