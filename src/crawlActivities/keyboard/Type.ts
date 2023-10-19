import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardTypeActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyboardTypeOptions>
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page?.keyboard.type(key,options);
        };
    }
}

