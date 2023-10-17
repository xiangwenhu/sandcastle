import Activity from "../crawlActivities/Hover";
import { EnumActivityStatus } from "../enum";
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IHoverActivityProps<C = any> extends IActivityProps<C> {
    selector: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IHoverActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.buildTask(props.selector);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
