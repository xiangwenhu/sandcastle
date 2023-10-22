import { KeyInput, KeyPressOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";


export interface KeyboardUpTaskOptions {
     key: KeyInput; options?: Readonly<KeyPressOptions> 
}

export default class KeyboardUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardUpTaskOptions> {
    buildTask() {
        return (_paramObj: IActivityRunParams) => {
            const { key, options } = this.taskOptions;
            return this.page!.keyboard.press(key, options);
        };
    }
}
