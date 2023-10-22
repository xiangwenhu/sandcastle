import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class ExposeFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        name: string,
        pptrFunction:
            | Function
            | {
                  default: Function;
              }
    ) {
        return (this.task = (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(name, paramObj);
            return this.page!.exposeFunction(rName, pptrFunction);
        });
    }
}
