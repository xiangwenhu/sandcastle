import { MouseWheelOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export type MouseWheelActivityOptions = Readonly<MouseWheelOptions>

export default class MouseWheelActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.mouse.wheel(options);
        };
    }
}
