import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type HoverTaskOptions = string;

export default class HoverActivity<
C = any,
R = any
> extends PageChildActivity<C, R, HoverTaskOptions> {

    buildTask(selector: HoverTaskOptions) {
        this.taskOptions = selector;
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.hover(this.taskOptions!)
        }
    }
}