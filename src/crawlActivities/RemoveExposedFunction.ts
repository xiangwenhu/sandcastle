import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type RemoveExposedActivityOptions = {
    name: string
};

export default class RemoveExposedFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, RemoveExposedActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.removeExposedFunction(options.name);
        });
    }
}
