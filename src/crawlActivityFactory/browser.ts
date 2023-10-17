import { PuppeteerLaunchOptions } from "puppeteer";
import Activity from "../crawlActivities/Browser"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IBrowserActivityProps<C = any> extends IActivityProps<C> {
    options: PuppeteerLaunchOptions;
}

export default (factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IBrowserActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context, [], props.options || {})
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.children = factory.createChildren(props.children || [], globalContext)
        activity.build();
        return activity
    }