import { HTTPRequest } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface WaitForRequestActivityOptions {
    urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), options?: { timeout?: number | undefined; } | undefined
}

export default class WaitForRequestActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForRequestActivityOptions> {
    buildTask() {
        return this.task = (paramObject: IActivityRunParams) => {
            const { urlOrPredicate, options } = this.options;
            return this.page!.waitForRequest(urlOrPredicate, options)
        }
    }
}