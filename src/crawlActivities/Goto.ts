import { GoToOptions } from "puppeteer-core";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface GotoActivityOptions {
    url: string;
    options?: GoToOptions | undefined;
}

export default class GotoActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    GotoActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const { url, options = {
                waitUntil: "load"
            } } = this.getReplacedOptions(paramObj);
            return this.action("goto", url, options);
        });
    }
}
