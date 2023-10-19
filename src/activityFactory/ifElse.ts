import AssertSequenceActivity from "../activities/AssertSequence";
import Activity from "../activities/IfElse"
import { IAssertSequenceActivityProps } from "./assertSequence";
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IIFElseActivityProps<C = any> extends IActivityProps<C> {
    assert: string;
    if: IAssertSequenceActivityProps;
    elseif: IAssertSequenceActivityProps[];
    else: IAssertSequenceActivityProps;
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: IIFElseActivityProps<C>, globalContext?: GC) => {
    const activity = new Activity(props.context)
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};;

    activity.if = factory.create(props.if, globalContext) as AssertSequenceActivity;
    if (props.elseif) {
        activity.elseif = factory.createChildren(props.elseif, globalContext) as AssertSequenceActivity[];
    }
    if (props.else) {
        activity.else = factory.create(props.else, globalContext) as AssertSequenceActivity;
    }

    activity.build();
    return activity
}