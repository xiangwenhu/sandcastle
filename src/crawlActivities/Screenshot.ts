import { ScreenshotOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class ScreenshotActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options: Readonly<ScreenshotOptions> & {
        encoding: 'base64';
    } | Readonly<ScreenshotOptions>) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.screenshot(options)
        }
    }
}