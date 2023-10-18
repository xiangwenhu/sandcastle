import { ActivityError } from "../ActivityError";
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



    #assert: AssertActivity | null = null;

    get assert(): AssertActivity | null {
        return this.#assert
    }

    set assert(value: AssertActivity) {
        this.#assert = value;
        if (value) {
            value.parent = this;
        }
    }

    async run(ctx: C, preRes: any = undefined, ...otherParams: any[]) {
        if (!this.assert) {
            throw new ActivityError("assert未定义", this);
        }
        const res = await this.assert.run(ctx, preRes, ...otherParams);
        if (!res) {
            return preRes;
        }
        return super.run(ctx, preRes, ...otherParams);
    }
}
