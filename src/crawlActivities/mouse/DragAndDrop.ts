import { Point } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDragAndDropActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: {
        start: Point;
        target: Point;
        options?: {
            delay?: number;
        };
    }) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const {start, target, options} = this.taskOptions;
            return this.page!.mouse.dragAndDrop(start, target, options);
        };
    }
}
