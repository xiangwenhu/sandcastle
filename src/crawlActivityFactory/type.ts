import { KeyboardTypeOptions } from "puppeteer";
import Activity from "../crawlActivities/Type"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface ITypeActivityProps<C = any> extends IActivityProps<C> {
    selector: string, 
    text: string, 
    options?: Readonly<KeyboardTypeOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: ITypeActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.selector, props.text, props.options);
        return activity
    }