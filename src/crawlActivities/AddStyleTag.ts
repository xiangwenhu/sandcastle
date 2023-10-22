import { FrameAddStyleTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class AddStyleTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options: Omit<FrameAddStyleTagOptions, 'url'> | FrameAddStyleTagOptions) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addStyleTag(options)
        }
    }
}