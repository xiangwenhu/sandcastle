import { ElementHandle } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class UploadFileActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string, ...paths: string[]): Function {
        return this.task = async (ctx: any, preRes: any) => {
            const rSelector = this.replaceVariable(selector, ctx, preRes) as string;
            const page = this.page;
            const fileInput: ElementHandle<HTMLInputElement> = await page!.$(rSelector) as ElementHandle<HTMLInputElement> ;
            await fileInput!.uploadFile(...paths);
            await page!.keyboard.press("Escape");
        }
    }
}