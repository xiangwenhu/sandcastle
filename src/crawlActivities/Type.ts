import { KeyboardTypeOptions, Protocol } from "puppeteer";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class TypeActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
        return this.task = (paramObject: IActivityRunParams)=> {
            return this.page!.type(selector, text, options)
        }
    }
}