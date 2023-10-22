import { ClickOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface ClickTaskOptions {
    selector: string;
    options?: Readonly<ClickOptions>;
}

export default class ClickActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    ClickTaskOptions
> {
    buildTask(options: ClickTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            const { selector, options } = this.taskOptions;
            return this.page!.click(selector, options);
        });
    }
}
