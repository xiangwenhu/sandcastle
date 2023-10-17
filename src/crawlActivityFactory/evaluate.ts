import Activity from "../crawlActivities/Evaluate"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IEvaluateActivityProps<C = any> extends IActivityProps<C> {
    code: string;
    args: any[]
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IEvaluateActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.code, props.args);
        return activity
    }