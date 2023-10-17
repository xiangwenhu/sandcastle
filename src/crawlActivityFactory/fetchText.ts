import Activity from "../crawlActivities/FetchText"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IFetchTextActivityProps<C = any> extends IActivityProps<C> {
    input: RequestInfo | URL,
    init?: RequestInit | undefined
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IFetchTextActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.input, props.init);
        return activity
    }