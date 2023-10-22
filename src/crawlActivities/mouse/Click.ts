import { MouseClickOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: {
        x: number;
        y: number;
        options?: Readonly<MouseClickOptions>;
    }) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const {x, y, options} = this.taskOptions;
            return this.page!.mouse.click(x, y, options);
        };
    }
}
