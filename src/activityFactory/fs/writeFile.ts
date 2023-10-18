import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import Activity from "../../activities/fs/WriteFile"
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IWriteFileActivityProps<C = any> extends IActivityProps<C> {
    dist: string,
    content: any,
    options?:
    | (ObjectEncodingOptions & {
        mode?: Mode | undefined;
        flag?: OpenMode | undefined;
    })
    | BufferEncoding
    | null
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IWriteFileActivityProps<C>, globalContext: GC) => {
        const activity = new Activity<C>(props.context)
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.build(props.dist, props.content, props.options);
        return activity
    }