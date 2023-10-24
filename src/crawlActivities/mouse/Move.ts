import { MouseMoveOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

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
        return (paramObj: IActivityExecuteParams) => {
            const { x, y, options } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.move(x, y, options);
        };
    }
}
