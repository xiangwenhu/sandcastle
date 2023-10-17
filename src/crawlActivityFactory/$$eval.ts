import { EvaluateFuncWith, NodeFor } from "puppeteer";
import Activity from "../crawlActivities/$$Eval"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";
import { EnumActivityStatus } from "../enum";

export interface I$$EvalActivityProps<C = any> extends IActivityProps<C> {
    selector: string;
    pageFunction: EvaluateFuncWith<Array<NodeFor<string>>, any>;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: I$$EvalActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.selector, props.pageFunction);
        activity.status = EnumActivityStatus.BUILDED;
        return activity
    }