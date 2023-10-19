import { MouseMoveOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseMoveActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        x: number, y: number, options?: Readonly<MouseMoveOptions>
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page?.mouse.move(x, y, options);
        };
    }
}
