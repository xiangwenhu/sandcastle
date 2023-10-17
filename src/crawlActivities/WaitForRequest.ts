import { HTTPRequest } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class WaitForRequestActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    protected buildTask(urlOrPredicate: string | ((req: HTTPRequest) => boolean | Promise<boolean>), options?: { timeout?: number | undefined; } | undefined): Function {
        return (..._args: any[]) => {
            return this.page?.waitForRequest(urlOrPredicate, options)
        }
    }
}