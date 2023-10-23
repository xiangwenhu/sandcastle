import { WaitForOptions } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export type GoForwardActivityOptions = WaitForOptions | undefined;

export default class GoForwardActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, GoForwardActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.goForward(this.options);
        });
    }
}
