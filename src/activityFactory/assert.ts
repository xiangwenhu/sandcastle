import Activity from "../activities/Assert"
import { ActivityFactoryFactory, IActivityProps } from "./types";

export interface ICodeActivityProps<C = any> extends IActivityProps<C> {
    code: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: ICodeActivityProps<C>, globalContext?: GC) => {
        const code = props.code;
        const activity = new Activity<C>(props.context, code)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext;
        activity.build(code);
        return activity
    }