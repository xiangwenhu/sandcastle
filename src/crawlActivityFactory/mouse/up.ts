import { MouseOptions } from "puppeteer";
import Activity from "../../crawlActivities/mouse/Up";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IMouseDownActivityProps<C = any> extends IActivityProps<C> {
    options?: Readonly<MouseOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IMouseDownActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
