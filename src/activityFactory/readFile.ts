import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import Activity from "../activities/ReadFile"
import { EnumActivityStatus } from "../enum";
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";

export interface IReadFileActivityProps<C = any> extends IActivityProps<C> {
    dist: string;
    contentType: "text" | "json";
    options?:
    | (ObjectEncodingOptions & {
        mode?: Mode | undefined;
        flag?: OpenMode | undefined;
    })
    | BufferEncoding
    | null
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IReadFileActivityProps<C>, globalContext: GC) => {
        const activity = new Activity<C>(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.dist, props.contentType, props.options);
        return activity
    }