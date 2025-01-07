import { Point, Protocol } from "puppeteer-core";
import PageChildActivity from "../PageChildActivity";
import { IActivityExecuteParams } from "../../types/activity";

export interface MouseDragEnterActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDragEnterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragEnterActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { target, data } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.dragEnter(target, data);
        };
    }
}
