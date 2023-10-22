import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type PdfTaskOptions = PDFOptions;

export default class PdfActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    PdfTaskOptions
> {
    buildTask(options?: PdfTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.pdf(options);
        });
    }
}
