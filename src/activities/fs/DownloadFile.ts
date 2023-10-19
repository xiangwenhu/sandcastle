import { AxiosRequestConfig } from "axios";
import { downloadFileWithRetry } from "../../util/loader";
import Activity from "../Activity";

export default class DownloadFileActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C) {
        super(context);
    }

    buildTask(url: string, dist: string, options?: {
        retryCount: number,
        requestConfig: AxiosRequestConfig,
        timeout: number
    }) {
        return (_ctx: C, res: any, extra?: any) => {
            const rUrl = this.replaceVariable(url, _ctx, res) as string;
            const rDist = this.replaceVariable(dist, _ctx, res) as string;
            return downloadFileWithRetry(rUrl, rDist, options)
        }
    }
}

