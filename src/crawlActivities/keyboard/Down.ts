import { KeyDownOptions, KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardDownActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyDownOptions>
    ) {
        return (_paramObj: IActivityRunParams) => {
            return this.page?.keyboard.down(key, options);
        };
    }
}
