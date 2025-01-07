import { Point, Protocol } from "puppeteer-core";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface MouseDragOverActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDragOverActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragOverActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { target, data } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.dragOver(target, data);
        };
    }
}
