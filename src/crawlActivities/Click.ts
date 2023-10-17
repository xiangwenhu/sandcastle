import PageChildActivity from "./PageChildActivity";

export default class ClickActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    protected buildTask(selector: string): Function {
        return (..._args: any[]) => {
            return this.page?.click(selector)
        }
    }
}