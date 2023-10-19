import { MouseOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export default class MouseDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        options?: Readonly<MouseOptions>
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page?.mouse.down(options);
        };
    }
}
