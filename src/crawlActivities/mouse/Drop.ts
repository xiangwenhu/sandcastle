import { Point, Protocol } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface MouseDropActivityOptions {
    target: Point; data: Protocol.Input.DragData
}

export default class MouseDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDropActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { target, data } = this.getReplacedOptions(paramObj);
            return this.page!.mouse.drop(target, data);
        };
    }
}
