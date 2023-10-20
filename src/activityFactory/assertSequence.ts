import _ from "lodash";
import AssertActivity from "../activities/Assert";
import Activity from "../activities/AssertSequence"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";
import { IAssertActivityProps } from "./assert";

export interface IAssertSequenceActivityProps<C = any> extends IActivityProps<C> {
    assert: IAssertActivityProps;
    children: IActivityProps[];
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IAssertSequenceActivityProps<C>, globalContext?: GC) => {
    const children: Activity[] = factory.createChildren(props.children, globalContext);
    const activity = new Activity(props.context, children)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;

    activity.assert = factory.create(props.assert, globalContext) as AssertActivity;

    activity.build();
    return activity
}