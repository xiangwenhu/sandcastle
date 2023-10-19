import Activity from "../../activities/variable/DeleteVariable"
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IDeleteVariableActivityProps<C = any> extends IActivityProps<C> {
    vName: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IDeleteVariableActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.vName);
        return activity
    }