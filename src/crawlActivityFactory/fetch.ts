import Activity from "../crawlActivities/Fetch"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IFetchTextActivityProps<C = any> extends IActivityProps<C> {
    url: RequestInfo | URL,
    options?: RequestInit | undefined,
    contentType?: "text" | "json"
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IFetchTextActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.url, props.options, props.contentType);
        return activity
    }