import Activity from "../../activities/fs/RemoveFile"
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IRemoveFileActivityProps<C = any> extends IActivityProps<C> {
    dist: string
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IRemoveFileActivityProps<C>, globalContext: GC) => {
        const activity = new Activity<C>(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.dist);
        return activity
    }