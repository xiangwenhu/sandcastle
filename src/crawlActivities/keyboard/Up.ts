import { KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardUpActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        key: KeyInput,
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.keyboard.up(key);
        };
    }
}

