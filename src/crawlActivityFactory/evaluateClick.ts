import Activity from "../crawlActivities/EvaluateClick"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IEvaluateClickActivityProps<C = any> extends IActivityProps<C> {
    selector: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IEvaluateClickActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector);
        return activity
    }