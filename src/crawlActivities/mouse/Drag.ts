import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDragActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        start: Point, target: Point
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.drag(start, target);
        };
    }
}
