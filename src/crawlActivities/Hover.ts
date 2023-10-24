import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type HoverActivityOptions = {
    selector: string
};

export default class HoverActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, HoverActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.hover(options.selector)
        })
    }
}