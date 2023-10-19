import { ElementHandle } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class UploadFileActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string, ...paths: string[]) {
        return this.task = async (paramObject: IActivityRunParams) => {
            const rSelector = this.replaceVariable(selector, paramObject) as string;
            const page = this.page;
            const fileInput: ElementHandle<HTMLInputElement> = await page!.$(rSelector) as ElementHandle<HTMLInputElement> ;
            await fileInput!.uploadFile(...paths);
            await page!.keyboard.press("Escape");
        }
    }
}