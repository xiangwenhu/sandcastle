import { HTTPResponse } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class WaitForResponseActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(urlOrPredicate: string | ((res: HTTPResponse) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }) {
        return this.task = async (paramObject: IActivityRunParams) => {
            const res = await this.page?.waitForResponse(urlOrPredicate, options);
            return res?.json()
        }
    }
}