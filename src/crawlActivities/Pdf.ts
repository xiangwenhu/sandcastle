import { PDFOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class PdfActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options?: PDFOptions) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.pdf(options)
        }
    }
}