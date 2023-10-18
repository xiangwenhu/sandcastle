import PageChildActivity from "./PageChildActivity";

export default class FetchActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    // @ts-ignore
    buildTask(
        input: RequestInfo | URL,
        init?: RequestInit | undefined, contentType?: "text" | "json"): Function {
        return this.task = async (..._args: any[]) => {
            const rInput = this.replaceVariable<RequestInfo | URL>(input, ...arguments);
            const rInit = this.replaceVariable<RequestInit | undefined>(init || {}, ...arguments);
            const res = await this.page?.evaluate((input, init = {}, cType = "json") => {
                const fRes = fetch(input, init);
                switch (cType) {
                    case "json":
                        return fRes.then(res => res.json());
                    default:
                        return fRes.then(res => res.text());
                }
            }, rInput, rInit, contentType);

            return res
        }
    }
}