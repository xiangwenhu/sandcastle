import Activity from "../../activities/variable/CreateVariable"
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface ICreateVariableActivityProps<C = any> extends IActivityProps<C> {
    vName: string;
    value: any
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: ICreateVariableActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.vName, props.value);
        return activity
    }