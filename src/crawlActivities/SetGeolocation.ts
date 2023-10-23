import { GeolocationOptions } from "puppeteer";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export type SetGeolocationActivityOptions = GeolocationOptions

export default class SetGeolocationActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetGeolocationActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page!.setGeolocation(this.options)
        }
    }
}