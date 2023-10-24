import { MouseClickOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

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
        return (paramObj: IActivityExecuteParams) => {
            const { x, y, options } =  this.getReplacedOptions(paramObj);
            return this.page!.mouse.click(x, y, options);
        };
    }
}
