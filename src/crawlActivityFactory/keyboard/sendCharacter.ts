import { KeyInput, KeyPressOptions } from "puppeteer";
import Activity from "../../crawlActivities/keyboard/SendCharacter";
import { EnumActivityStatus } from "../../enum";
import { ActivityFactoryFactory, IActivityProps } from "../../types/activity";

export interface IKeyBoardSendCharacterActivityProps<C = any> extends IActivityProps<C> {
    key: KeyInput,
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IKeyBoardSendCharacterActivityProps<C>, globalContext: GC) => {
        const activity = new Activity(props.context);
        activity.name = props.name || activity.name;
        activity.globalCtx = globalContext || {};
        activity.status = EnumActivityStatus.BUILDING;
        activity.buildTask(props.key);
        activity.status = EnumActivityStatus.BUILDED
        return activity;
    };
