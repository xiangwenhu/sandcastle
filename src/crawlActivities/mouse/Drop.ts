import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        target: Point, data: Protocol.Input.DragData
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.drop(target, data);
        };
    }
}
