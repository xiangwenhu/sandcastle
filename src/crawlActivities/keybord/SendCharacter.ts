import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardSendCharacter<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
    ): Function {
        return (..._args: any[]) => {
            return this.page?.keyboard.sendCharacter(key);
        };
    }
}
