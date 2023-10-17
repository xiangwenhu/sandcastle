import PageChildActivity from "./PageChildActivity";

export default class GetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    protected buildTask(..._args: any[]): Function {
        return (..._args: any[]) => {
            return this.page!.cookies();
        }
    }
}