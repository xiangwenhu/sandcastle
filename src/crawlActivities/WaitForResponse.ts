import { HTTPResponse } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

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
        return this.task = async (paramObject: IActivityRunParams) => {
            const { urlOrPredicate, options } = this.options;
            const res = await this.page!.waitForResponse(urlOrPredicate, options);
            return res?.json()
        }
    }
}