import Activity from "../crawlActivities/UploadFile"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IUploadFileActivityProps<C = any> extends IActivityProps<C> {
    selector: string,
    paths: string[]
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IUploadFileActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector, ...(props.paths || []));
        return activity
    }