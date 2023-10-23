import { AxiosRequestConfig } from "axios";
import { downloadFileWithRetry } from "../../util/loader";
import Activity from "../Activity";
import { IActivityExecuteParams } from "../../types/activity";

export interface DownloadFileActivityOptions {
    url: string;
    dist: string;
    options?: {
        retryCount: number;
        requestConfig: AxiosRequestConfig;
        timeout: number;
    };
}

export default class DownloadFileActivity<C = any> extends Activity<
    C,
    string,
    DownloadFileActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { url, options, dist } = this.options;
            const rUrl = this.replaceVariable(url, paramObj) as string;
            const rDist = this.replaceVariable(dist, paramObj) as string;
            return downloadFileWithRetry(rUrl, rDist, options);
        };
    }
}
