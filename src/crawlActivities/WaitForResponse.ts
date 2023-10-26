import { HTTPResponse } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface WaitForResponseActivityOptions {
    urlOrPredicate: string | ((res: HTTPResponse) => boolean | Promise<boolean>)
    options?: {
        timeout?: number;
    }
}

export default class WaitForResponseActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForResponseActivityOptions> {
    buildTask() {
        return this.task = async (paramObject: IActivityExecuteParams) => {
            const { urlOrPredicate, options } = this.getReplacedOptions(paramObject);
            const res = await this.page!.waitForResponse(urlOrPredicate, options);
            return res?.json()
        }
    }
}