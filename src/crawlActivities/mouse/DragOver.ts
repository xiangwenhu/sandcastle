import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseDragOverActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        target: Point, data: Protocol.Input.DragData
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.dragOver(target, data);
        };
    }
}
