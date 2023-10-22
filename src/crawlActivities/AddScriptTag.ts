import { FrameAddScriptTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddScriptTagTaskOptions = FrameAddScriptTagOptions;

export default class AddScriptTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: AddScriptTagTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addScriptTag(this.taskOptions );
        });
    }
}
