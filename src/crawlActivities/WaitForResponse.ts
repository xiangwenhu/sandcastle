import { HTTPResponse } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class WaitForResponseActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    protected buildTask(urlOrPredicate: string | ((res: HTTPResponse) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }): Function {
        return async (..._args: any[]) => {
            const res = await this.page?.waitForResponse(urlOrPredicate, options);
            return res?.json()
        }
    }
}