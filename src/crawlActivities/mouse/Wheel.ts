import { MouseWheelOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export type MouseWheelActivityOptions = Readonly<MouseWheelOptions>

export default class MouseWheelActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.wheel(this.options);
        };
    }
}
