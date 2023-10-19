import { Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class SetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    constructor(ctx: any, protected cookies: Protocol.Network.CookieParam[] = []){
        super(ctx);
    }

    buildTask(cookies: Protocol.Network.CookieParam[]) {
        this.cookies = cookies || this.cookies;
        return this.task = (paramObject: IActivityRunParams) => {
            return this.action("setCookie", ...this.cookies)
        }
    }
}