import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class SetExtraHTTPHeadersActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(headers: Record<string, string>) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setExtraHTTPHeaders(headers);
        }
    }
}