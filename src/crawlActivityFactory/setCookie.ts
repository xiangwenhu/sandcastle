import { GoToOptions, Protocol } from "puppeteer";
import Activity from "../crawlActivities/SetCookie"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface ISetCookieActivityProps<C = any> extends IActivityProps<C> {
    options: GoToOptions | undefined;
    cookies: Protocol.Network.CookieParam[];
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: ISetCookieActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context, props.cookies)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }