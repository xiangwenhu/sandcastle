import { MouseOptions } from "puppeteer-core";
import PageChildActivity from "../PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../../types/activity";

export type MouseDownActivityOptions = Readonly<MouseOptions>;

export default class MouseDownActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseDownActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.mouse.down(options);
        };
    }
}
