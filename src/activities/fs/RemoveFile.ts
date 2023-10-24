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
