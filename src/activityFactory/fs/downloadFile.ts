import { AxiosRequestConfig } from "axios";
import Activity from "../../activities/fs/DownloadFile"
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IDownloadFileActivityProps<C = any> extends IActivityProps<C> {
    url: string;
    dist: string;
    options?: {
        retryCount: number,
        requestConfig: AxiosRequestConfig,
        timeout: number
    }
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IDownloadFileActivityProps<C>, globalContext: GC) => {
        const activity = new Activity<C>(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.url, props.dist, props.options);
        return activity
    }