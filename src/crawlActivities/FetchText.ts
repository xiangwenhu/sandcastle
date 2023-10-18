import PageChildActivity from "./PageChildActivity";

export default class FetchTextActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(input: RequestInfo | URL, init?: RequestInit | undefined): Function {
        return this.task = (..._args: any[]) => {
            const rInput = this.replaceVariable<RequestInfo | URL>(input, ...arguments);
            const rInit = this.replaceVariable<RequestInit | undefined>(init || {}, ...arguments);
            return this.page?.evaluate((input, init) => {
                return fetch(input, init).then(res => res.text())
            }, rInput, rInit)
        }
    }
}