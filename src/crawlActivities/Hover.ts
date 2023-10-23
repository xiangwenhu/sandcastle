import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type HoverActivityOptions = {
    selector: string
};

export default class HoverActivity<
C = any,
R = any
> extends PageChildActivity<C, R, HoverActivityOptions> {

    buildTask() {
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.hover(this.options.selector)
        }
    }
}