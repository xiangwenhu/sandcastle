import { FrameAddScriptTagOptions } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddScriptTagActivityOptions = FrameAddScriptTagOptions;

export default class AddScriptTagActivity<
    C = any,
    R = any,
> extends PageChildActivity<C, R, AddScriptTagActivityOptions> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.addScriptTag(options);
        });
    }
}
