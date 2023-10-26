import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class IsClosedActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask() {
        return this.task = (paramObject: IActivityExecuteParams) => {
            return this.page!.isClosed()
        }
    }
}