import { KeyboardTypeOptions, Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";

export default class TypeActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): Function {
        return this.task = (..._args: any[]) => {
            return this.page?.type(selector, text, options)
        }
    }
}