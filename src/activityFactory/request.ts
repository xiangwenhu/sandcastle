import { AxiosRequestConfig } from "axios";
import Activity from "../activities/Request"
import { ActivityFactoryFactory, IActivityProps } from "./types";

export interface IRequestActivityProps<C = any> extends IActivityProps<C> {
    config: AxiosRequestConfig;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IRequestActivityProps<C>, globalContext?: GC) => {
        const activity = new Activity<C>(props.context, props.config)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext;
        activity.build();
        return activity
    }