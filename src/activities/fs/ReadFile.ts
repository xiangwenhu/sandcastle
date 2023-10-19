import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import { IActivityRunParams } from "../../types/activity";
import Activity from "../Activity";

export default class ReadFileActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C) {
        super(context);
    }

    buildTask(dist: string, type: "text" | "json" = "json", options?:
        | (
            & ObjectEncodingOptions
            & {
                flag?: OpenMode | undefined;
            }
        )
        | BufferEncoding
        | null) {
        return async (paramObj: IActivityRunParams) => {
            const rDist = this.replaceVariable(dist, paramObj) as string;

            const res = await fsp.readFile(rDist, options || {
                encoding: "utf-8",
            });
            switch (type) {
                case "json":
                    return JSON.parse(res as string);
                default:
                    return res
            }

        }
    }
}

