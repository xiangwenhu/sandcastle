import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardTypeTaskOptions {
    key: KeyInput;
    options?: Readonly<KeyboardTypeOptions>;
}

export default class KeyboardTypeActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardTypeTaskOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { key, options } = this.taskOptions;
            return this.page!.keyboard.type(key, options);
        };
    }
}
