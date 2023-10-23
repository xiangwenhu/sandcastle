import { MouseOptions } from "puppeteer";
import PageChildActivity from "../PageChildActivity";
import { IActivityRunParams } from "../../types/activity";

export type MouseUpActivityOptions =  Readonly<MouseOptions>;

export default class MouseUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseUpActivityOptions> {
    buildTask() {
                return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.up(this.options);
        };
    }
}
