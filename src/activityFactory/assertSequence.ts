import AssertActivity from "../activities/Assert";
import Activity from "../activities/AssertSequence"
import { ActivityFactoryFactory, IActivityProps } from "./types";

export interface IAssertSequenceActivityProps<C = any> extends IActivityProps<C> {
    assert: string;
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IAssertSequenceActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = [] as any;
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext;
    activity.children = factory.createChildren(props.children, globalContext);
    activity.assert = factory.create({
        type: "assert",
        code: `return (${props.assert})`,
        context: props.context
    }) as AssertActivity;

    activity.build();
    return activity
}