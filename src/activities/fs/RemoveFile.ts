import fsp from 'fs/promises';
import fs from "fs";
import Activity from "../Activity";

export default class RemoveFileActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C) {
        super(context);
    }

    buildTask(dist: string) {
        return async (_ctx: C, res: any, extra?: any) => {
            const rDist = this.replaceVariable(dist, _ctx, res) as string;
            if (!fs.existsSync(rDist)) {
                return false
            }
            await fsp.unlink(rDist);
            return true
        }
    }
}

