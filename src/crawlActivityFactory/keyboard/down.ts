import { KeyDownOptions, KeyInput } from "puppeteer";
import Activity from "../../crawlActivities/keyboard/Down";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IKeyBoardDownActivityProps<C = any> extends IActivityProps<C> {
    key: KeyInput,
    options?: Readonly<KeyDownOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IKeyBoardDownActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.key, props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
