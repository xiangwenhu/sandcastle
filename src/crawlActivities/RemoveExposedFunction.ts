import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type RemoveExposedTaskOptions = string;

export default class RemoveExposedFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, RemoveExposedTaskOptions> {
    buildTask(options: string) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(this.taskOptions!, paramObj);
            return this.page!.removeExposedFunction(rName);
        });
    }
}
