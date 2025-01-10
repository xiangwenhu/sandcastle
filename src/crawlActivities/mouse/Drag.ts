import { Point } from "puppeteer-core";
import PageChildActivity from "../PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../../types/activity";

export interface MouseDragActivityOptions {
    start: Point; target: Point
}

export default class MouseDragActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { start, target } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.drag(start, target);
        };
    }
}
