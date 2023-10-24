import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface ExposeFunctionActivityOptions {
    name: string;
    function:
    | Function
    | {
        default: Function;
    };
}

export default class ExposeFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ExposeFunctionActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { name, function: pptrFunction } = this.getReplacedOptions(paramObj);
            return this.page!.exposeFunction(name, pptrFunction);
        });
    }
}
