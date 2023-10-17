import Activity from "../crawlActivities/URL"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IURLActivityProps<C = any> extends IActivityProps<C> {
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IURLActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }