import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import AssertSequenceActivity from "./AssertSequence";

export default class IFElseActivity<C = any, R = any> extends Activity<C, R> {
    accessor if: AssertSequenceActivity | null = null;
    accessor elseif: AssertSequenceActivity[] | null = null;
    accessor else: AssertSequenceActivity | null = null;

    constructor(context: C) {
        super(context);
        this.type = "ifElse";
    }

    buildTask() {
        if (!this.if) {
            throw new ActivityError("if未定义", this);
        }

        const sequenceCol = [this.if];
        if (this.elseif) {
            sequenceCol.push(...this.elseif);
        }
        // if (this.else) {
        //     sequenceCol.push(this.else);
        // }

        return async (paramObj: IActivityRunParams) => {
            let assertR: boolean = false;
            let r: any;
            for (let i = 0; i < sequenceCol.length; i++) {
                const act = sequenceCol[i];
                act.ctx = this.ctx;
                assertR = await act.assert!.run(paramObj);
                // 执行后状态会被改变
                if (act.assert) {
                    act.assert.status = EnumActivityStatus.BUILDED;
                }
                if (assertR) {
                    return act.run(paramObj);
                }
            }

            return this.else?.run(paramObj);
        };
    }
}
