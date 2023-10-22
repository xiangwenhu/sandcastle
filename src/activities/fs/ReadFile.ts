import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export interface ReadFileTaskOptions {
    dist: string;
    type: "text" | "json"
    options?:
        | (ObjectEncodingOptions & {
              flag?: OpenMode | undefined;
          })
        | BufferEncoding
        | null;
}

export default class ReadFileActivity<C = any> extends Activity<C, string, ReadFileTaskOptions> {
    buildTask() {
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(this.taskOptions.dist, paramObj) as string;

            const res = await fsp.readFile(
                rDist,
                this.taskOptions.options || {
                    encoding: "utf-8",
                }
            );
            switch (this.taskOptions.type) {
                case "json":
                    // @ts-ignore
                    return JSON.parse(res as string); 
                default:
                    return res;
            }
        };
    }
}
