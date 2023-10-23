import { KeyDownOptions, KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardDownActivityOptions {
    key: KeyInput;
    options?: Readonly<KeyDownOptions>;
}

export default class KeyboardDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardDownActivityOptions> {
    buildTask() {
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.down(
                this.options.key,
                this.options.options
            );
        };
    }
}
