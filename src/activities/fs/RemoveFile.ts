import fs from "fs";
import fsp from "fs/promises";
import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";
import { registerActivity } from "../../activityFactory/factory";

export interface RemoveFileActivityOptions {
    dist: string;
}

@registerActivity("fs.removeFile")
export default class RemoveFileActivity<C = any> extends Activity<C, string, RemoveFileActivityOptions> {
    buildTask() {
        return async (paramObj: IActivityExecuteParams) => {
            const { dist } = this.getReplacedOptions(
                paramObj
            );
            if (!fs.existsSync(dist)) {
                return false;
            }
            await fsp.unlink(dist);
            return true;
        };
    }
}
