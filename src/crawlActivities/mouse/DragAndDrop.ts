import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseDragAndDropActivityOptions {
    start: Point;
    target: Point;
    options?: {
        delay?: number;
    };
}

export default class MouseDragAndDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragAndDropActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { start, target, options } = this.options;
            return this.page!.mouse.dragAndDrop(start, target, options);
        };
    }
}
