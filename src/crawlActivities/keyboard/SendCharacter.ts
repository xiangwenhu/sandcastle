import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardSendCharacterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: KeyInput) {
        this.taskOptions = options;
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.sendCharacter(this.taskOptions);
        };
    }
}
