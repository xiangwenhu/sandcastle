import { IActivityRunParams } from "../types/activity";
import CodeActivity from "./Code";

export default class AssertActivity<C = any> extends CodeActivity<C, boolean> {

    async run(paramObj: IActivityRunParams = this.defaultTaskRunParam): Promise<boolean> {
        const res = await super.run(paramObj);
        return !!res
    }
}


