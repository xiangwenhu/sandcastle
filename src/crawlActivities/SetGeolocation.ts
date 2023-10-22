import { GeolocationOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class SetGeolocationActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(options: GeolocationOptions) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setGeolocation(options)
        }
    }
}