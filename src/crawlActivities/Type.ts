import { KeyboardTypeOptions, Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export interface TypeTaskOptions {
    selector: string;
    text: string;
    options?: Readonly<KeyboardTypeOptions>;
}

export default class TypeActivity<C = any, R = any> extends PageChildActivity<
    C,
    R,
    TypeTaskOptions
> {
    buildTask(options: TypeTaskOptions) {
        this.taskOptions = options;
        return (this.task = (paramObject: IActivityRunParams) => {
            const { selector, text, options } = this.taskOptions!;
            return this.page!.type(selector, text, options);
        });
    }
}
