import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

export default class ParallelForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {
    constructor(context: C, protected values: any[]) {
        super(context);
    }

    // @ts-ignore
    buildTask(children?: Activity[], values: any[]) {
        this.children = children || this.children || [];
        this.values = values || this.values || [];
        return super.buildTask(this.children);
    }

    run(paramObj: IActivityRunParams = this.defaultTaskRunParam): Promise<any> {
        const values = this.values;
        return new Promise(async (resolve, reject) => {
            this.ctx = this.ctx || {};
            try {
                const ps = values.map(item => {
                    this.ctx.item = item;
                    return super.run(paramObj)
                })
                const res = await Promise.all(ps);
                resolve(res);
            } catch (err: any) {
                reject(new ActivityError(err && err.message, this));
            }
        });

    }
}

