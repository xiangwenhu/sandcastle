import { WaitForSelectorOptions } from "puppeteer";
import Activity from "../crawlActivities/WaitForSelector"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IWaitForSelectorActivityProps<C = any> extends IActivityProps<C> {
    selector: string,
    options?: WaitForSelectorOptions
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IWaitForSelectorActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector, props.options);
        return activity
    }