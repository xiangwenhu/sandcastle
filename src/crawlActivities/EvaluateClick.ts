import PageChildActivity from "./PageChildActivity";

export default class EvaluateClickActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    protected buildTask(selector: string): Function {
        return (..._args: any[]) => {
            return this.page?.evaluate((selector) => {
                return (document.querySelector(selector) as HTMLElement)?.click()
            }, selector)
        }
    }
}