import { FrameAddStyleTagOptions } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type AddStyleTagActivityOptions = Omit<FrameAddStyleTagOptions, 'url'> | FrameAddStyleTagOptions;

export default class AddStyleTagActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, AddStyleTagActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.addStyleTag(options)
        }
    }
}