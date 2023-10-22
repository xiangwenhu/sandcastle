import { Point, Protocol } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: { target: Point; data: Protocol.Input.DragData }) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const { target, data } = this.taskOptions;
            return this.page!.mouse.drop(target, data);
        };
    }
}
