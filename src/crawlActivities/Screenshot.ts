import { ScreenshotOptions } from "puppeteer";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type ScreenshotActivityOptions =
    | (Readonly<ScreenshotOptions> & {
        encoding: "base64";
    })
    | Readonly<ScreenshotOptions>;

export default class ScreenshotActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ScreenshotActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.screenshot(options);
        });
    }
}
