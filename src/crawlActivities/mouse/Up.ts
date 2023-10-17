import { MouseOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";

export default class MouseUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        options?: Readonly<MouseOptions>
    ): Function {
        return (..._args: any[]) => {
            return this.page?.mouse.up(options);
        };
    }
}
