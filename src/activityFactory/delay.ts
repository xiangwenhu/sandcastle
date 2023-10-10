import Activity from "../activities/Delay"
import { ActivityFactoryFactory, IActivityProps } from "./types";

export interface IDelayActivityProps<C = any> extends IActivityProps<C> {
    timeout: number;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IDelayActivityProps<C>, globalContext?: GC) => {
        const activity = new Activity(props.context, props.timeout)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext

        activity.build(props.timeout);
        return activity
    }