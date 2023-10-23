import { MouseMoveOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseMoveActivityOptions {
    x: number;
    y: number;
    options?: Readonly<MouseMoveOptions>;
}

export default class MouseMoveActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { x, y, options } = this.options;
            return this.page!.mouse.move(x, y, options);
        };
    }
}
