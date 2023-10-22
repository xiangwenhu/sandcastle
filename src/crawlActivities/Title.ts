import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class TitleActivity<
C = any,
R = any
> extends PageChildActivity<C, R> {

    buildTask() {
        return this.task = (paramObject: IActivityRunParams) => {
            return this.page!.title()
        }
    }
}