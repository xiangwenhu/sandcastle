import { Viewport } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class SetViewportActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(viewport: Viewport) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setViewport(viewport)
        }
    }
}