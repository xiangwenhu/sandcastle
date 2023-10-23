import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface $$ActivityOptions {
    selector: string
};


export default class $$Activity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    $$ActivityOptions
> {
    buildTask() {
        return (this.task = (paramObj: IActivityRunParams) => {
            return this.page!.$$(this.options.selector);
        });
    }
}
