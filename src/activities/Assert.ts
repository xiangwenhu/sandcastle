import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export default class AssertActivity<C = any> extends SequenceActivity<C, boolean> {

    buildTask(children?: Activity<any, any>[] | undefined): (paramObj: IActivityRunParams) => Promise<unknown> {
        return super.buildTask(children);
    }

    async run(paramObj: IActivityRunParams = this.defaultTaskRunParam): Promise<boolean> {
        if (this.parent) {
            this.ctx = this.parent?.ctx;
        }
        super.adjust();
        const res = await super.run(paramObj);
        return !!res
    }
}


