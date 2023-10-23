import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export interface MouseDropActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDropActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const { target, data } = this.options;
            return this.page!.mouse.drop(target, data);
        };
    }
}
