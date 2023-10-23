import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

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

export default class ReadFileActivity<C = any> extends Activity<C, string, ReadFileActivityOptions> {
    buildTask() {
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(this.options.dist, paramObj) as string;

            const res = await fsp.readFile(
                rDist,
                this.options.options || {
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
