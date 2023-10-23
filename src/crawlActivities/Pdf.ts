import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type PdfActivityOptions = PDFOptions;

export default class PdfActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    PdfActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.pdf(this.options);
        });
    }
}
