import Activity from "../activities/TryCatch"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface ITryCatchActivityProps<C = any> extends IActivityProps<C> {
    catch: IActivityProps;
}

export default (factory: ActivityFactoryFactory) => <C = any, GC = any>(props: ITryCatchActivityProps<C>, globalContext?: GC) => {
    const activity = new Activity(props.context, [])
    activity.name = props.name || activity.name;
    activity.globalCtx = globalContext || {};

    activity.children = factory.createChildren(props.children || [], globalContext);

    activity.catch = factory.create(props.catch, globalContext) as Activity;
    activity.catch.build();

    activity.build();
    return activity
}