import Activity from "../activities/All"
import {  ActivityFactoryFactory, IActivityProps } from "./types";

export interface IAllActivityProps<C = any> extends IActivityProps<C> {
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IAllActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext;
    activity.children = factory.createChildren(props.children, globalContext)
    activity.build();
    return activity
}