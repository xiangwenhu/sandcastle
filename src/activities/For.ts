import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

export default class ForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {
    constructor(context: C, public values: any[]) {
        super(context);
    }

    // @ts-ignore
    buildTask(values: any[]) {
        this.values = values || this.values;
        this.children.forEach(c => c.useParentCtx = true);
        return super.buildTask(this.children);
    }

    run(paramObj: IActivityRunParams = {
        preRes: undefined,
        extra: {}
    }): Promise<R | undefined> {
        const that = this as Activity;
        return new Promise(async (resolve, reject) => {
            const values = this.replaceVariable(this.values, paramObj) as any[];
            let preRes;
            for (let i = 0; i < values.length; i++) {
                const val = values[i];
                this.ctx.item = val;
                try {
                    preRes = await super.run(paramObj)
                } catch (err: any) {
                    reject(new ActivityError(err && err.message, that));
                } finally {
                }
            }
            resolve(preRes);
        });
    }
}

