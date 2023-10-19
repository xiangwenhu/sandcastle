import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class FetchActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
        input: RequestInfo | URL,
        init?: RequestInit | undefined,
        contentType?: "text" | "json"
    ) {
        return (this.task = async (paramObj: IActivityRunParams) => {
            const rInput = this.replaceVariable<RequestInfo | URL>(
                input,
                paramObj
            );
            const rInit = this.replaceVariable<RequestInit | undefined>(
                init || {},
                paramObj
            );
            const res = await this.page?.evaluate(
                (input, init = {}, cType = "json") => {
                    const fRes = fetch(input, init);
                    switch (cType) {
                        case "json":
                            return fRes.then((res) => res.json());
                        default:
                            return fRes.then((res) => res.text());
                    }
                },
                rInput,
                rInit,
                contentType
            );

            return res;
        });
    }
}
