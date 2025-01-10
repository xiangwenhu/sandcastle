import { Protocol } from "puppeteer-core";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface SetUserAgentActivityOptions {
    userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata
}

export default class SetUserAgentActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetUserAgentActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { userAgent, userAgentMetadata } = this.getReplacedOptions(paramObj);
            return this.page!.setUserAgent(userAgent, userAgentMetadata)
        })
    }
}