import { FrameAddScriptTagOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddScriptTagActivityOptions = FrameAddScriptTagOptions;

export default class AddScriptTagActivity<
    C = any,
    R = any,
> extends PageChildActivity<C, R, AddScriptTagActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.addScriptTag(this.options);
        });
    }
}
