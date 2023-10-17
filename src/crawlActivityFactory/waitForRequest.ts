import { HTTPRequest } from "puppeteer";
import Activity from "../crawlActivities/WaitForRequest"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IWaitForRequestActivityProps<C = any> extends IActivityProps<C> {
    urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), 
    options?: { timeout?: number | undefined; } | undefined
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IWaitForRequestActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.urlOrPredicate, props.options);
        return activity
    }