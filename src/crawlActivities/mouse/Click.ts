import { MouseClickOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        x: number,
        y: number,
        options?: Readonly<MouseClickOptions>
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.click(x, y, options);
        };
    }
}
