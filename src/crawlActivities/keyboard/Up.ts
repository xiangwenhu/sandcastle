import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export default class KeyboardUpActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(
    ) {
        return (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.keyboard.up(options);
        };
    }
}

