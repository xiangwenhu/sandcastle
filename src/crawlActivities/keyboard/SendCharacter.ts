import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardSendCharacterActivityOptions {
    char: string;
}

export default class KeyboardSendCharacterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardSendCharacterActivityOptions> {
    buildTask() {
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.sendCharacter(this.options.char);
        };
    }
}
