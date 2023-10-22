import { KeyDownOptions, KeyInput } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class KeyboardDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: { key: KeyInput; options?: Readonly<KeyDownOptions> }) {
        this.taskOptions = options;
        return (_paramObj: IActivityRunParams) => {
            return this.page!.keyboard.down(this.taskOptions.key, this.taskOptions.options);
        };
    }
}
