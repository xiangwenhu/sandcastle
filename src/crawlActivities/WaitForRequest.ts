import { HTTPRequest } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface WaitForRequestActivityOptions {
    urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), options?: { timeout?: number | undefined; } | undefined
}

export default class WaitForRequestActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForRequestActivityOptions> {
    buildTask() {
        return this.task = (paramObject: IActivityExecuteParams) => {
            const { urlOrPredicate, options } = this.getReplacedOptions(paramObject);
            return this.page!.waitForRequest(urlOrPredicate, options)
        }
    }
}