import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseDragEnterActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDragEnterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDragEnterActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { target, data } = this.options;
            return this.page!.mouse.dragEnter(target, data);
        };
    }
}
