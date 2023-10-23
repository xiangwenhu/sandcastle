import { MouseClickOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseClickActivityOptions {
    x: number;
    y: number;
    options?: Readonly<MouseClickOptions>;
}

export default class MouseClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseClickActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { x, y, options } = this.options;
            return this.page!.mouse.click(x, y, options);
        };
    }
}
