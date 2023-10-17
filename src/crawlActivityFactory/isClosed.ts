import Activity from "../crawlActivities/IsClosed"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IIsClosedActivityProps<C = any> extends IActivityProps<C> {
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IIsClosedActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }