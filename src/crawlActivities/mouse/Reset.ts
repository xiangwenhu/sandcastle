import { IActivityRunParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export default class MouseResetActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
    ) {
        return (paramObj: IActivityRunParams) => {
            return this.page!.mouse.reset();
        };
    }
}
