import { WaitForOptions } from "puppeteer";
import Activity from "../crawlActivities/WaitForNav"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IWaitForNavActivityProps<C = any> extends IActivityProps<C> {
    options: WaitForOptions
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IWaitForNavActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.options);
        return activity
    }