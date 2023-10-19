import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDragAndDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        start: Point,
        target: Point,
        options?: {
            delay?: number;
        }
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page?.mouse.dragAndDrop(start, target, options);
        };
    }
}
