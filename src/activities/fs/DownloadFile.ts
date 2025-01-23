import { AxiosRequestConfig } from "axios";
import { downloadFileWithRetry } from "../../util/loader";
import Activity from "../Activity";
import { IActivityExecuteParams } from "../../types/activity";
import { registerActivity } from "../../activityFactory/factory";
import path from "path";
import { isSubSafePath } from "../../util/fs";

export interface DownloadFileActivityOptions {
    url: string;
    dist: string;
    options?: {
        retryCount: number;
        requestConfig: AxiosRequestConfig;
        timeout: number;
    };
}

@registerActivity("fs.downloadFile")
export default class DownloadFileActivity<C = any> extends Activity<
    C,
    string,
    DownloadFileActivityOptions
> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { url, options, dist } = this.getReplacedOptions(paramObj);

            const isSafePath = isSubSafePath(dist);
            if (!isSafePath) throw new Error(`不安全的目录:${dist}`);

            return downloadFileWithRetry(url, dist, options);
        };
    }
}
