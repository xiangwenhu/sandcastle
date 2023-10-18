import Activity from "../activities/ParallelFor";
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IParallelForActivityProps<C = any> extends IActivityProps<C> {
    children: IActivityProps[];
    values: any[]
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IParallelForActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = factory.createChildren(props.children, globalContext);
    const activity = new Activity(props.context, children, props.values || [])
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;
    activity.build();
    return activity
}