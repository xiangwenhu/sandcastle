import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class ReadFileActivity<C = any> extends Activity<C, string> {
    buildTask(options: {
        dist: string;
        type: "text" | "json"
        options?:
            | (ObjectEncodingOptions & {
                  flag?: OpenMode | undefined;
              })
            | BufferEncoding
            | null;
    }) {
        this.taskOptions = options;
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
