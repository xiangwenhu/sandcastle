import { Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";


export type SetCookieATaskOptions = Protocol.Network.CookieParam[]

export default class SetCookieActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetCookieATaskOptions> {

    buildTask(cookies: Protocol.Network.CookieParam[]) {
        this.taskOptions = cookies;
        return (this.task = (paramObject: IActivityRunParams) => {
            return this.action("setCookie", ...this.taskOptions!);
        });
    }
}
