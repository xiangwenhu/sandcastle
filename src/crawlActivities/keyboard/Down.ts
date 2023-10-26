import { KeyDownOptions, KeyInput } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface KeyboardDownActivityOptions {
    key: KeyInput;
    options?: Readonly<KeyDownOptions>;
}

export default class KeyboardDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardDownActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { key, options } = this.getReplacedOptions(paramObj);
            return this.page!.keyboard.down(key, options);
        };
    }
}
