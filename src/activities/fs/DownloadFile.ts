import { AxiosRequestConfig } from "axios";
import { downloadFileWithRetry } from "../../util/loader";
import Activity from "../Activity";
import { IActivityRunParams } from "../../types/activity";

export interface DownloadFileTaskOptions {
    url: string;
    dist: string;
    options?: {
        retryCount: number;
        requestConfig: AxiosRequestConfig;
        timeout: number;
    };
}

export default class DownloadFileActivity<C = any> extends Activity<C, string> {
    buildTask(options: DownloadFileTaskOptions) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const rUrl = this.replaceVariable(
                this.taskOptions.url,
                paramObj
            ) as string;
            const rDist = this.replaceVariable(
                this.taskOptions.dist,
                paramObj
            ) as string;
            return downloadFileWithRetry(rUrl, rDist, this.taskOptions.options);
        };
    }
}
