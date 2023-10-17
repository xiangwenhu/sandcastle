import { Point } from "puppeteer";
import Activity from "../../crawlActivities/mouse/Drag";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IMouseDragActivityProps<C = any> extends IActivityProps<C> {
    start: Point, target: Point
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IMouseDragActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.start, props.target);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
