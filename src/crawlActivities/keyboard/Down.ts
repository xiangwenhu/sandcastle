import { KeyDownOptions, KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardDownActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyDownOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.keyboard.down(key, options);
        };
    }
}
