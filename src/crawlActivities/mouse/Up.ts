import { MouseOptions } from "puppeteer";
import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export type MouseUpActivityOptions = Readonly<MouseOptions>;

export default class MouseUpActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, MouseUpActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.mouse.up(options);
        };
    }
}
