import { KeyInput, KeyboardTypeOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardTypeActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
        options?: Readonly<KeyboardTypeOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.keyboard.type(key,options);
        };
    }
}

