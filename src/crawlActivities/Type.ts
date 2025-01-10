import { KeyboardTypeOptions } from "puppeteer-core";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export interface TypeActivityOptions {
    selector: string;
    text: string;
    options?: Readonly<KeyboardTypeOptions>;
}

export default class TypeActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    TypeActivityOptions
> {
    buildTask() {
        return (this.task = (paramObject: IActivityExecuteParams) => {
            const { selector, text, options } = this.getReplacedOptions(paramObject);
            return this.page!.type(selector, text, options);
        });
    }
}
