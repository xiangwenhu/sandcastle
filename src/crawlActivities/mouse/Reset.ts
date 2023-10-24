import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export default class MouseResetActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
    ) {
        return (paramObj: IActivityExecuteParams) => {
            return this.page!.mouse.reset();
        };
    }
}
