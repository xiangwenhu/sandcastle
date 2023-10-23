import fs from "fs";
import fsp from "fs/promises";
import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";

export interface RemoveFileActivityOptions {
    dist: string;
}

export default class RemoveFileActivity<C = any> extends Activity<C, string, RemoveFileActivityOptions> {
    buildTask() {
        return async (paramObj: IActivityExecuteParams) => {
            const rDist = this.replaceVariable(
                this.options.dist,
                paramObj
            ) as string;
            if (!fs.existsSync(rDist)) {
                return false;
            }
            await fsp.unlink(rDist);
            return true;
        };
    }
}
