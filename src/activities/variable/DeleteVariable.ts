import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class DeleteVariableActivity<C = any> extends Activity<C, any> {
    buildTask(name: string) {
        return (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(name, paramObj) as string;
            delete this.globalVariables[rName];
        };
    }
}
