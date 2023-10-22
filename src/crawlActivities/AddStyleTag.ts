import { FrameAddStyleTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddScriptTagTaskOptions =  Omit<FrameAddStyleTagOptions, 'url'> | FrameAddStyleTagOptions;

export default class AddStyleTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options: AddScriptTagTaskOptions) {
        this.taskOptions = options;
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addStyleTag(this.taskOptions)
        }
    }
}