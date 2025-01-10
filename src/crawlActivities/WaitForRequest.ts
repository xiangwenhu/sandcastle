import { HTTPRequest } from "puppeteer-core";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface WaitForRequestActivityOptions {
    urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>),
    options?: { timeout?: number | undefined; } | undefined,
    useRequest: boolean;
}

export default class WaitForRequestActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForRequestActivityOptions> {
    buildTask() {
        return this.task = async (paramObject: IActivityExecuteParams) => {
            const { urlOrPredicate, options, useRequest } = this.getReplacedOptions(paramObject);
            const req = await this.page!.waitForRequest(urlOrPredicate, options);
            if (!useRequest) {
                return;
            }
            return req;
        }
    }
}