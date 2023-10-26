import { Viewport } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type SetViewportActivityOptions = Viewport

export default class SetViewportActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetViewportActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            return this.page!.setViewport(this.options)
        })
    }
}