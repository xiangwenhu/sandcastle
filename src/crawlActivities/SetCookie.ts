import { Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class SetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    constructor(ctx: any, protected cookies: Protocol.Network.CookieParam[] = []){
        super(ctx);
    }

    buildTask(cookies: Protocol.Network.CookieParam[]): Function {
        this.cookies = cookies || this.cookies;
        return this.task = (..._args: any[]) => {
            return this.action("setCookie", ...this.cookies)
        }
    }
}