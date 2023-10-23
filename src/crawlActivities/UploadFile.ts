import { ElementHandle } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface UploadFileActivityOptions {
    selector: string, paths: string[]
}

export default class UploadFileActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, UploadFileActivityOptions> {

    buildTask() {
        return this.task = async (paramObject: IActivityRunParams) => {
            const { selector, paths } = this.options;
            const rSelector = this.replaceVariable(selector, paramObject) as string;
            const page = this.page;
            const fileInput: ElementHandle<HTMLInputElement> = await page!.$(rSelector) as ElementHandle<HTMLInputElement>;
            await fileInput!.uploadFile(...paths);
            await page!.keyboard.press("Escape");
        }
    }
}