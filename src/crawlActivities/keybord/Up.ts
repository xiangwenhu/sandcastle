import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardUpActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
    ): Function {
        return (..._args: any[]) => {
            return this.page?.keyboard.up(key);
        };
    }
}

