import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type RemoveExposedActivityOptions = {
    name: string
};

export default class RemoveExposedFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, RemoveExposedActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(this.options.name, paramObj);
            return this.page!.removeExposedFunction(rName);
        });
    }
}
