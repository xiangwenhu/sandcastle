import { KeyInput, KeyPressOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyPressOptions>
    ) {
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.press(key, options);
        };
    }
}
