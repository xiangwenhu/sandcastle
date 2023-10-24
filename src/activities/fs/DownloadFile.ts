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
            const { url, options, dist } =  this.getReplacedOptions(paramObj);
            return downloadFileWithRetry(url, dist, options);
        };
    }
}
