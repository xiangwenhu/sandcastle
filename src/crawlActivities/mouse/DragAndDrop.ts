import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

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
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.dragAndDrop(start, target, options);
        };
    }
}
