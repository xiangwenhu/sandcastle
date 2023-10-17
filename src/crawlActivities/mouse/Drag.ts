import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseDragActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        start: Point, target: Point
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.drag(start, target);
        };
    }
}
