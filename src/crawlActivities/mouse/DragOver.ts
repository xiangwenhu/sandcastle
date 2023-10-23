import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseDragOverActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDragOverActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragOverActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { target, data } = this.options;
            return this.page!.mouse.dragOver(target, data);
        };
    }
}
