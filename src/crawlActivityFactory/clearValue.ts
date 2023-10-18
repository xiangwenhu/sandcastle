import Activity from "../crawlActivities/ClearValue"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IClearValueActivityProps<C = any> extends IActivityProps<C> {
    selector: string
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IClearValueActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector);
        return activity
    }