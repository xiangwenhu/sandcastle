import { Protocol, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class SetUserAgentActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata) {
        return this.task =(paramObject: IActivityRunParams) => {
            return this.page!.setUserAgent(userAgent, userAgentMetadata)
        }
    }
}