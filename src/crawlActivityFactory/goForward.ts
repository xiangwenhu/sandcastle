import Activity from "../crawlActivities/GoBack"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IGoForwardActivityProps<C = any> extends IActivityProps<C> {
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IGoForwardActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }