import { Protocol } from "puppeteer";
import Activity from "../crawlActivities/SetUserAgent"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface ISetUserAgentActivityProps<C = any> extends IActivityProps<C> {
    userAgent: string, 
    userAgentMetadata?: Protocol.Emulation.UserAgentMetadata
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: ISetUserAgentActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.userAgent, props.userAgentMetadata);
        return activity
    }