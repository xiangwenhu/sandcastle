import { Protocol, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class SetUserAgentActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata): Function {
        return (..._args: any[]) => {
            return this.page?.setUserAgent(userAgent, userAgentMetadata)
        }
    }
}