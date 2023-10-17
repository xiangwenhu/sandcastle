import { MouseWheelOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseWheelActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        options?: Readonly<MouseWheelOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.wheel(options);
        };
    }
}
