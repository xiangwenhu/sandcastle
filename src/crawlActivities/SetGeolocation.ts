import { GeolocationOptions } from "puppeteer-core";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export type SetGeolocationActivityOptions = GeolocationOptions

export default class SetGeolocationActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetGeolocationActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.page!.setGeolocation(options)
        })
    }
}