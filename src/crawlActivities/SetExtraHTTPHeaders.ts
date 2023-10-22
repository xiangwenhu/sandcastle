import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type SetExtraHTTPHeadersTaskOptions =  Record<string, string>;

export default class SetExtraHTTPHeadersActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetExtraHTTPHeadersTaskOptions> {

    buildTask(headers: SetExtraHTTPHeadersTaskOptions) {
        this.taskOptions = headers;
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setExtraHTTPHeaders(this.taskOptions!);
        }
    }
}