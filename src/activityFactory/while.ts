import Activity from "../activities/While"
import {  ActivityFactoryFactory, IActivityProps } from "./types";

export interface ISequenceActivityProps<C = any> extends IActivityProps<C> {
    assert: string;
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: ISequenceActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, props.assert, children)
    activity.name = props.name || activity.name;
    activity.globalContext = globalContext;
    activity.children = factory.createChildren(props.children, globalContext)
    activity.build();
    return activity
}