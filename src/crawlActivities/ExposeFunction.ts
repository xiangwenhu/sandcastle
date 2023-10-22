import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface ExposeFunctionTaskOptions {
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
> extends PageChildActivity<C, R> {
    buildTask(options: ExposeFunctionTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            const { name, function: pptrFunction } = this.taskOptions;
            const rName = this.replaceVariable(name, paramObj);
            return this.page!.exposeFunction(rName, pptrFunction);
        });
    }
}