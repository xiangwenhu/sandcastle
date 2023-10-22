import { MouseMoveOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseMoveActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: {
        x: number;
        y: number;
        options?: Readonly<MouseMoveOptions>;
    }) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const { x, y, options } = this.taskOptions;
            return this.page!.mouse.move(x, y, options);
        };
    }
}
