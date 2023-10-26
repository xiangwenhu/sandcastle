import { ClickOptions } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface ClickActivityOptions {
    selector: string;
    options?: Readonly<ClickOptions>;
}

export default class ClickActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    ClickActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { selector, options } = this.getReplacedOptions(paramObj);
            return this.page!.click(selector, options);
        });
    }
}
