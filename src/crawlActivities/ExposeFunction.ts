import { IActivityRunParams } from "../types/activity";
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
        return (this.task = (paramObj: IActivityRunParams) => {
            const { name, function: pptrFunction } = this.options;
            const rName = this.replaceVariable(name, paramObj);
            return this.page!.exposeFunction(rName, pptrFunction);
        });
    }
}
