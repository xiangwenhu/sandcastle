import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface FetchActivityOptions {
    url: RequestInfo | URL;
    init?: RequestInit | undefined;
    contentType?: "text" | "json";
}

export default class FetchActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    FetchActivityOptions
> {
    buildTask() {
        return (this.task = async (paramObj: IActivityRunParams) => {
            const { url: input, init = {}, contentType = "json" } = this.options;
            const rInput = this.replaceVariable<RequestInfo | URL>(
                input,
                paramObj
            );
            const rInit = this.replaceVariable<RequestInit | undefined>(
                init,
                paramObj
            );
            const res = await this.page!.evaluate(
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
