import { Point } from "puppeteer";
import Activity from "../../crawlActivities/mouse/DragAndDrop";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IMouseDragAndDropActivityProps<C = any> extends IActivityProps<C> {
    start: Point,
    target: Point,
    options?: {
        delay?: number;
    }
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IMouseDragAndDropActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.start, props.target, props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
