import { GoToOptions } from "puppeteer";
import Activity from "../crawlActivities/Click"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IClickActivityProps<C = any> extends IActivityProps<C> {
    selector: string
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IClickActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector);
        return activity
    }