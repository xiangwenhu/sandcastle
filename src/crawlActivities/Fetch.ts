import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
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
        return (this.task = async (paramObj: IActivityExecuteParams) => {
            const { url, init = {}, contentType = "json" } = this.getReplacedOptions(paramObj);
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
                url,
                init,
                contentType
            );

            return res;
        });
    }
}
