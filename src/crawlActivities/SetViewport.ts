import { Viewport } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type SetViewportActivityOptions = Viewport

export default class SetViewportActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetViewportActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setViewport(this.options)
        })
    }
}