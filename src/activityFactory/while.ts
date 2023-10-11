import AssertActivity from "../activities/Assert";
import Activity from "../activities/While"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IWhileActivityProps<C = any> extends IActivityProps<C> {
    assert: string;
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IWhileActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;
    activity.children = factory.createChildren(props.children, globalContext);
    activity.assert = factory.create({
        type: "assert",
        code: `return (${props.assert})`,
        context: props.context
    }) as AssertActivity;

    activity.assert.parent = activity.parent;

    activity.build();
    return activity
}