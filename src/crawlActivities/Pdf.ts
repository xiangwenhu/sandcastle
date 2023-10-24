import { PDFOptions } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type PdfActivityOptions = PDFOptions;

export default class PdfActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    PdfActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.pdf(options);
        });
    }
}
