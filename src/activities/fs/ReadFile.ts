import { ObjectEncodingOptions, OpenMode } from "fs";
import fsp from "fs/promises";
import Activity from "../Activity";
import path from "path";

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
        return async (_ctx: C, preRes: any, ...otherParams: any[]) => {
            const rDist = this.replaceVariable(dist, _ctx, preRes) as string;

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

