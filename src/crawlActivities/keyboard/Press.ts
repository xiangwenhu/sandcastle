import { KeyInput, KeyPressOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyPressOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.keyboard.press(key, options);
        };
    }
}
