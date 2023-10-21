import fsp from "fs/promises";
import fs from "fs";
import Activity from "../Activity";
import { IActivityRunParams } from "../../types/activity";

export default class RemoveFileActivity<C = any> extends Activity<C, string> {
    buildTask(dist: string) {
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(dist, paramObj) as string;
            if (!fs.existsSync(rDist)) {
                return false;
            }
            await fsp.unlink(rDist);
            return true;
        };
    }
}
