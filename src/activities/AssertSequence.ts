import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import AssertActivity from "./Assert";
import SequenceActivity from "./Sequence";

export default class AssertSequenceActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {
    constructor(context: C) {
        super(context);
    }

    #assert: AssertActivity | undefined = undefined;

    get assert(): AssertActivity | undefined {
        return this.#assert;
    }

    set assert(value: AssertActivity) {
        this.#assert = value;
        if (value) {
            value.parent = this as Activity;
        }
    }

    buildTask(
        children?: Activity<any, any>[] | undefined
    ): (paramObj: IActivityRunParams) => Promise<unknown> {
        if (children) {
            this.children = children;
        }
        this.childrenUseParentCtx(true);
        return super.buildTask(this.children);
    }

    async run(paramObj: IActivityRunParams = this.defaultTaskRunParam) {
        if (this.assert) {
            const res = await this.assert.run(paramObj);
            if (res === undefined) {
                return paramObj.$preRes;
            }
        }
        return super.run(paramObj);
    }

    allUserParentCtx(useParentCtx: boolean = true): void {
        super.allUserParentCtx(useParentCtx);
        this.assert?.allUserParentCtx(useParentCtx);
    }
}
