import { EvaluateFuncWith, NodeFor } from "puppeteer";
import Activity from "../crawlActivities/$Eval"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface I$EvalActivityProps<C = any> extends IActivityProps<C> {
    selector: string;
    pageFunction: EvaluateFuncWith<NodeFor<string>, any>;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: I$EvalActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector, props.pageFunction);
        return activity
    }