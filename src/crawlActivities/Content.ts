import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class ContentActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page?.content();
        });
    }
}
