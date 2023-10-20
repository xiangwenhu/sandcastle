import AssertActivity from "../activities/Assert";
import Activity from "../activities/While"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";
import { IAssertActivityProps } from "./assert";

export interface IWhileActivityProps<C = any> extends IActivityProps<C> {
    assert: IAssertActivityProps;
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IWhileActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;
    activity.assert = factory.create(props.assert, globalContext) as AssertActivity;

    activity.children = factory.createChildren(props.children, globalContext);

    activity.build();
    return activity
}