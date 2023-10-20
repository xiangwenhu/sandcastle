import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export default class $$Activity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    constructor(ctx: C) {
        super(ctx)
    }

    buildTask<Selector extends string>(selector: Selector) {
        return this.task = (paramObj: IActivityRunParams) => {
            return this.page?.$$(selector)
        }
    }
}