import { HTTPResponse } from "puppeteer";
import Activity from "../crawlActivities/WaitForResponse"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IWaitForRequestActivityProps<C = any> extends IActivityProps<C> {
    urlOrPredicate: string | ((res: HTTPResponse) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IWaitForRequestActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.urlOrPredicate, props.options);
        return activity
    }