import { MouseMoveOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseMoveActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        x: number, y: number, options?: Readonly<MouseMoveOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.move(x, y, options);
        };
    }
}
