import { GoToOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface GotoTaskOptions {
    url: string;
    options: GoToOptions | undefined;
}

export default class GotoActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GotoTaskOptions
> {
    buildTask(options: GotoTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObject: IActivityRunParams) => {
            const { url, options } = this.taskOptions!;
            const rUrl = this.replaceVariable(url, paramObject);
            const rOptions = this.replaceVariable(options, paramObject);
            return this.action("goto", rUrl, rOptions);
        });
    }
}
