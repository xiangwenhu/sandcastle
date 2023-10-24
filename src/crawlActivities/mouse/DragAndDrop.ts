import { Point } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

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
        return (paramObj: IActivityExecuteParams) => {
            const { start, target, options } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.dragAndDrop(start, target, options);
        };
    }
}
