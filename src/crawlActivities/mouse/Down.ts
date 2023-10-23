import { MouseOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export type MouseDownActivityOptions =  Readonly<MouseOptions>;

export default class MouseDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDownActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.down(this.options);
        };
    }
}
