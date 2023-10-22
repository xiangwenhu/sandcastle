import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardTypeActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: {
        key: KeyInput;
        options?: Readonly<KeyboardTypeOptions>;
    }) {
        return (paramObj: IActivityRunParams) => {
            const { key, options } = this.taskOptions;
            return this.page!.keyboard.type(key, options);
        };
    }
}
