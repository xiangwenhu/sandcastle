import { KeyboardTypeOptions, Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

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
        return (this.task = (paramObject: IActivityRunParams) => {
            const { selector, text, options } = this.options!;
            return this.page!.type(selector, text, options);
        });
    }
}
