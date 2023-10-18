import PageChildActivity from "./PageChildActivity";

export default class GetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(..._args: any[]): Function {
        return this.task = (..._args: any[]) => {
            return this.action("cookies")
        }
    }
}