import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardTypeActivityOptions {
    key: KeyInput;
    options?: Readonly<KeyboardTypeOptions>;
}

export default class KeyboardTypeActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardTypeActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { key, options } = this.options;
            return this.page!.keyboard.type(key, options);
        };
    }
}
