import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface KeyboardSendCharacterTaskOptions {
    char: string;
}

export default class KeyboardSendCharacterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardSendCharacterTaskOptions> {
    buildTask() {
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.sendCharacter(this.taskOptions.char);
        };
    }
}
