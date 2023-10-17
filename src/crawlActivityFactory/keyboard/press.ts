import { KeyInput, KeyPressOptions } from "puppeteer";
import Activity from "../../crawlActivities/keyboard/Press";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IKeyBoardPressActivityProps<C = any> extends IActivityProps<C> {
    key: KeyInput,
    options?: Readonly<KeyPressOptions>
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IKeyBoardPressActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.key, props.options);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
