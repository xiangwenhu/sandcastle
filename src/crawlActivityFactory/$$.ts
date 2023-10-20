import { EvaluateFuncWith, NodeFor } from "puppeteer";
import Activity from "../crawlActivities/$$"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";
import { EnumActivityStatus } from "../enum";

export interface I$$ActivityProps<C = any> extends IActivityProps<C> {
    selector: string;
    pageFunction: EvaluateFuncWith<Array<NodeFor<string>>, any>;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props:  I$$ActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.selector);
        activity.status = EnumActivityStatus.BUILDED;
        return activity
    }