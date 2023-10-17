import { MouseMoveOptions } from "puppeteer";
import Activity from "../../crawlActivities/mouse/Move";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IMouseMoveActivityProps<C = any> extends IActivityProps<C> {
    x: number, y: number, options?: Readonly<MouseMoveOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IMouseMoveActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.x, props.y, props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
