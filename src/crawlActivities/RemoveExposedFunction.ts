import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type RemoveExposedFunctionActivityOptions = {
    name: string
};

export default class RemoveExposedFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, RemoveExposedFunctionActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.removeExposedFunction(options.name);
        });
    }
}
