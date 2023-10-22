import fsp from "fs/promises";
import fs from "fs";
import Activity from "../Activity";
import { IActivityRunParams } from "../../types/activity";

export interface RemoveFileTaskOPtions {
    dist: string;
}

export default class RemoveFileActivity<C = any> extends Activity<C, string, RemoveFileTaskOPtions> {
    buildTask(options: RemoveFileTaskOPtions) {
        this.taskOptions = options;
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(
                this.taskOptions.dist,
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
