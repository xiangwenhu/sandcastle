import { HTTPRequest } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class WaitForRequestActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), options?: { timeout?: number | undefined; } | undefined) {
        return this.task = (paramObject: IActivityRunParams) => {
            return this.page!.waitForRequest(urlOrPredicate, options)
        }
    }
}