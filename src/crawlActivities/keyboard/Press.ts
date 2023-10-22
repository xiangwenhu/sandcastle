import { KeyInput, KeyPressOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: { key: KeyInput; options?: Readonly<KeyPressOptions> }) {
        this.taskOptions = options;
        return (_paramObj: IActivityRunParams) => {
            const { key, options } = this.taskOptions;
            return this.page!.keyboard.press(key, options);
        };
    }
}
