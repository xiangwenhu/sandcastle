import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardSendCharacter<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
    ) {
        return (_paramObj: IActivityRunParams) => {
            return this.page?.keyboard.sendCharacter(key);
        };
    }
}
