import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDragActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: { start: Point; target: Point }) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const { start, target } = this.taskOptions;
            return this.page!.mouse.drag(start, target);
        };
    }
}
