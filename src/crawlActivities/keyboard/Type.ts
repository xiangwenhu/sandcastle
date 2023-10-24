import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface KeyboardTypeActivityOptions {
    key: KeyInput;
    options?: Readonly<KeyboardTypeOptions>;
}

export default class KeyboardTypeActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardTypeActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { key, options } = this.getReplacedOptions(paramObj);
            return this.page!.keyboard.type(key, options);
        };
    }
}
