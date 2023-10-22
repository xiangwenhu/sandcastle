import { FrameAddScriptTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class AddScriptTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options: FrameAddScriptTagOptions) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addScriptTag(options)
        }
    }
}