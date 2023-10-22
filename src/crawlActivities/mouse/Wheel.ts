import { MouseWheelOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseWheelActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        options?: Readonly<MouseWheelOptions>
    ) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.wheel(this.taskOptions);
        };
    }
}
