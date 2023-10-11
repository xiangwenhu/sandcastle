import Activity from "../activities/Sequence"
import {  ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface ISequenceActivityProps<C = any> extends IActivityProps<C> {
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: ISequenceActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;
    activity.children = factory.createChildren(props.children, globalContext)
    activity.build();
    return activity
}