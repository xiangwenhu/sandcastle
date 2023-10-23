import { Protocol, WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface SetUserAgentActivityOptions {
    userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata
}

export default class SetUserAgentActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetUserAgentActivityOptions> {

    buildTask() {
        return this.task = (paramObject: IActivityRunParams) => {
            const { userAgent, userAgentMetadata } = this.options;
            return this.page!.setUserAgent(userAgent, userAgentMetadata)
        }
    }
}