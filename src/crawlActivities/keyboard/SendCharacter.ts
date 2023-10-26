import { IActivityExecuteParams } from "../../types/activity";
import PageChildActivity from "../PageChildActivity";

export interface KeyboardSendCharacterActivityOptions {
    char: string;
}

export default class KeyboardSendCharacterActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, KeyboardSendCharacterActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const { char } = this.getReplacedOptions(paramObj);
            return this.page!.keyboard.sendCharacter(char);
        };
    }
}
