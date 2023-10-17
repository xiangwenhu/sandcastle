import { PuppeteerLaunchOptions } from "puppeteer";
import Activity from "../crawlActivities/GetCookie"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IGetCookieActivityProps<C = any> extends IActivityProps<C> {
    options: PuppeteerLaunchOptions;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IGetCookieActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }