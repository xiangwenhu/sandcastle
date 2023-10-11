import Activity from "../activities/Terminate"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IBreakActivityProps<C = any> extends IActivityProps<C> {
    message: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IBreakActivityProps<C>, globalContext?: GC) => {
        const activity = new Activity<C>(props.context as C, props.message)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};;
        activity.build();
        return activity
    }