import { MouseClickOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        x: number,
        y: number,
        options?: Readonly<MouseClickOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.click(x, y, options);
        };
    }
}
