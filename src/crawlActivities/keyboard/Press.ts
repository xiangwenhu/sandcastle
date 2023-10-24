import { KeyInput, KeyPressOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface KeyboardUpActivityOptions {
     key: KeyInput; options?: Readonly<KeyPressOptions> 
}

export default class KeyboardUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardUpActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { key, options } = this.getReplacedOptions(paramObj);
            return this.page!.keyboard.press(key, options);
        };
    }
}
