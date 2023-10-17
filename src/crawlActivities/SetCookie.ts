import { Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class GetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    constructor(ctx: any, protected cookies: Protocol.Network.CookieParam[]){
        super(ctx);
    }

    protected buildTask(cookies: Protocol.Network.CookieParam[]): Function {
        this.cookies = cookies || this.cookies;
        return (..._args: any[]) => {
            return this.page!.setCookie(...this.cookies);
        }
    }
}