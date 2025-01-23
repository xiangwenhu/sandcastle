import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { IActivityExecuteParams } from "../../types/activity";
import Activity from "../Activity";
import { registerActivity } from "../../activityFactory/factory";
import { isSubSafePath } from "../../util/fs";

export interface ReadFileActivityOptions {
    dist: string;
    type: "text" | "json"
    options?:
    | (ObjectEncodingOptions & {
        flag?: OpenMode | undefined;
    })
    | BufferEncoding
    | null;
}

@registerActivity("fs.readFile")
export default class ReadFileActivity<C = any> extends Activity<C, string, ReadFileActivityOptions> {
    buildTask() {
        return async (paramObj: IActivityExecuteParams) => {
            const { dist, options } = this.getReplacedOptions(paramObj);

            const isSafePath = isSubSafePath(dist);
            if (!isSafePath) throw new Error(`不安全的目录:${dist}`);

            const res = await fsp.readFile(
                dist,
                options || {
                    encoding: "utf-8",
                }
            );
            switch (this.options.type) {
                case "json":
                    // @ts-ignore
                    return JSON.parse(res as string);
                default:
                    return res;
            }
        };
    }
}
