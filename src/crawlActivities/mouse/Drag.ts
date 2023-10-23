import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseDragActivityOptions {
    start: Point; target: Point
}


export default class MouseDragActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { start, target } = this.options;
            return this.page!.mouse.drag(start, target);
        };
    }
}
