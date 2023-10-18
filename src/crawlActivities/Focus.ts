import PageChildActivity from "./PageChildActivity";

export default class FocusActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.focus(selector)
        }
    }
}