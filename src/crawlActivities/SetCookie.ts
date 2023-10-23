import { Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";


export type SetCookieAActivityOptions = Protocol.Network.CookieParam[]

export default class SetCookieActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetCookieAActivityOptions> {

    buildTask() {
        return (this.task = (paramObject: IActivityRunParams) => {
            return this.action("setCookie", ...(this.options || []));
        });
    }
}
