import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class GetCookieActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(..._args: any[]) {
        return this.task = (paramObj: IActivityExecuteParams) => {
            return this.action("cookies")
        }
    }
}