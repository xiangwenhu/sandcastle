import { HTTPResponse } from "puppeteer-core";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams } from "../types/activity";
import { isString } from "lodash";


export type HTTPResponseHandler = (res: HTTPResponse, paramObject?: IActivityExecuteParams) => boolean | Promise<boolean>;

export interface WaitForResponseActivityOptions {
    urlOrPredicate: string | HTTPResponseHandler
    options?: {
        timeout?: number;
    },
    useTaskParams?: boolean;
    contentType: "text" | "json",
    useResponse: boolean;
}

export default class WaitForResponseActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, WaitForResponseActivityOptions> {
    buildTask() {
        return this.task = async (paramObject: IActivityExecuteParams) => {
            const { urlOrPredicate, options, useTaskParams, contentType = "text", useResponse = true } = this.getReplacedOptions(paramObject);
            if (isString(urlOrPredicate)) {
                return this.page!.waitForResponse(urlOrPredicate, options);
            }
            let httRes: HTTPResponse;
            if (!useTaskParams) {
                httRes = await this.page!.waitForResponse((res => {
                    return urlOrPredicate.call(this.page!, res)
                }), options);
            } else {
                httRes = await this.page!.waitForResponse((res => {
                    return urlOrPredicate.call(this.page!, res, paramObject)
                }), options);
            }

            if (useResponse) {
                let res: string | Record<string, any> | undefined;
                switch (contentType) {
                    case "text":
                        res = await httRes.text();
                    default:
                        res = await httRes.json();
                }
                return res;
            }
            return {
                url: httRes.url(),
                headers: httRes.headers(),
                status: httRes.status(),
                statusText: httRes.statusText(),
            }
        }
    }
}