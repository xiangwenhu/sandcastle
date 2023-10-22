import { KeyDownOptions, KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardDownTaskOptions {
    key: KeyInput;
    options?: Readonly<KeyDownOptions>;
}

export default class KeyboardDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardDownTaskOptions> {
    buildTask() {
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.down(
                this.taskOptions.key,
                this.taskOptions.options
            );
        };
    }
}
