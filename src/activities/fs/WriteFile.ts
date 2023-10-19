import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import Activity from "../Activity";
import fsp from "fs/promises";
import fs from "fs";
import { isPlainObject } from "lodash";
import path from "path";
import { ensureDir } from "../../util/fs";

export default class WriteFileActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C) {
        super(context);
    }

    buildTask(dist: string, content: any, options?:
        | (ObjectEncodingOptions & {
            mode?: Mode | undefined;
            flag?: OpenMode | undefined;
        })
        | BufferEncoding
        | null) {
        return async (_ctx: C, res: any, extra?: any) => {
            const rDist = this.replaceVariable(dist, _ctx, res) as string;
            const rContent = this.replaceVariable(content, _ctx, res) as any;
            const data = isPlainObject(rContent) ? JSON.stringify(rContent, undefined, "\t") : rContent;

            await ensureDir(rDist)

            return fsp.writeFile(rDist, data, options)
        }
    }
}

