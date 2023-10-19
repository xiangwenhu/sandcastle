import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import AssertActivity from "./Assert";
import SequenceActivity from "./Sequence";

export default class AssertSequenceActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R>{

    constructor(context: C, children: Activity[]) {
        super(context, children)
    }

    #assert: AssertActivity | undefined = undefined;

    get assert(): AssertActivity | undefined {
        return this.#assert
    }

    set assert(value: AssertActivity) {
        this.#assert = value;
        if (value) {
            value.parent = this as Activity;
        }
    }

    async run(paramObj: IActivityRunParams) {
        if (!this.assert) {
            throw new ActivityError("assert未定义", this);
        }
        const res = await this.assert.run(paramObj);
        if (res === undefined) {
            return paramObj.preRes;
        }
        return super.run(paramObj);
    }
}
