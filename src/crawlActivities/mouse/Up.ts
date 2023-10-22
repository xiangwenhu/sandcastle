import { MouseOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        options?: Readonly<MouseOptions>
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.up(options);
        };
    }
}
