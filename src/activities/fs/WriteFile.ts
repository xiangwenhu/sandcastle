import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { isPlainObject } from "lodash";
import { IActivityRunParams } from "../../types/activity";
import { ensureDir } from "../../util/fs";
import Activity from "../Activity";

export default class WriteFileActivity<C = any> extends Activity<C, string> {
    buildTask(options: {
        dist: string;
        content: any;
        options?:
            | (ObjectEncodingOptions & {
                  mode?: Mode | undefined;
                  flag?: OpenMode | undefined;
              })
            | BufferEncoding
            | null;
    }) {
        this.taskOptions = options;
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(options.dist, paramObj) as string;
            const rContent = this.replaceVariable(options.content, paramObj) as any;
            const data = isPlainObject(rContent)
                ? JSON.stringify(rContent, undefined, "\t")
                : rContent;

            await ensureDir(rDist);

            return fsp.writeFile(rDist, data, options.options);
        };
    }
}
