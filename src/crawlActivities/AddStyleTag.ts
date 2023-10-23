import { FrameAddStyleTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddScriptTagActivityOptions = Omit<FrameAddStyleTagOptions, 'url'> | FrameAddStyleTagOptions;

export default class AddStyleTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, AddScriptTagActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addStyleTag(this.options)
        }
    }
}