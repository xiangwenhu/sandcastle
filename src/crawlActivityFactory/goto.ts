import { GoToOptions} from "puppeteer";
import Activity from "../crawlActivities/Goto"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IGotoActivityProps<C = any> extends IActivityProps<C> {
    options: GoToOptions | undefined;
    url: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IGotoActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context, props.url, props.options)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build();
        return activity
    }