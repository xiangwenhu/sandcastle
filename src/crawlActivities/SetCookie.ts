import { Protocol } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";


export type SetCookieAActivityOptions = Protocol.Network.CookieParam[]

export default class SetCookieActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, SetCookieAActivityOptions> {

    buildTask() {
        return (this.task = (paramObj: IActivityExecuteParams) => {
            const options = this.getReplacedOptions(paramObj);
            return this.action("setCookie", ...(options || []));
        });
    }
}
