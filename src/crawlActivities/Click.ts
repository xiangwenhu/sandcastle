import { ClickOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
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
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, options } = this.options;
            return this.page!.click(selector, options);
        });
    }
}
