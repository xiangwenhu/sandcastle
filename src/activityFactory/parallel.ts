import Activity from "../activities/Parallel"
import {  ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IParallelActivityProps<C = any> extends IActivityProps<C> {
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IParallelActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;
    activity.children = factory.createChildren(props.children, globalContext)
    activity.build();
    return activity
}