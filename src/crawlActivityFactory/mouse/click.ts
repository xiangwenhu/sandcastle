import { MouseClickOptions } from "puppeteer";
import Activity from "../../crawlActivities/mouse/Click";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IMouseClickActivityProps<C = any> extends IActivityProps<C> {
    x: number,
    y: number,
    options?: Readonly<MouseClickOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IMouseClickActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.x, props.y, props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
