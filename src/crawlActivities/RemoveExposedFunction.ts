import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class RemoveExposedFunctionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(
        name: string
    ) {
        return (this.task = (paramObj: IActivityRunParams) => {
            const rName = this.replaceVariable(name, paramObj);
            return this.page!.removeExposedFunction(rName);
        });
    }
}
