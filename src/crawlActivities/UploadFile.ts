import { ElementHandle } from "puppeteer-core";
import PageChildActivity from "./PageChildActivity";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface UploadFileActivityOptions {
    selector: string, paths: string[]
}

export default class UploadFileActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, UploadFileActivityOptions> {

    buildTask() {
        return (this.task = async (paramObject: IActivityExecuteParams) => {
            const { selector, paths } = this.getReplacedOptions(paramObject);
            const page = this.page;
            const fileInput: ElementHandle<HTMLInputElement> = await page!.$(selector) as ElementHandle<HTMLInputElement>;
            await fileInput!.uploadFile(...paths);
            await page!.keyboard.press("Escape");
        })
    }
}