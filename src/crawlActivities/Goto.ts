import { GoToOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface GotoActivityOptions {
    url: string;
    options: GoToOptions | undefined;
}

export default class GotoActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GotoActivityOptions
> {
    buildTask() {
        return (this.task = (paramObject: IActivityRunParams) => {
            const { url, options } = this.options!;
            const rUrl = this.replaceVariable(url, paramObject);
            const rOptions = this.replaceVariable(options, paramObject);
            return this.action("goto", rUrl, rOptions);
        });
    }
}
