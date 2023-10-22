import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class HoverActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string) {
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.hover(selector)
        }
    }
}