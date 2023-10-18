import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";

export default class ParallelForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {
    constructor(context: C, children: Activity[], protected values: any[]) {
        super(context, children);
    }

    // @ts-ignore
    buildTask(children?: Activity[], values: any[]) {
        this.children = children || this.children || [];
        this.values = values || this.values || [];
        return super.buildTask(this.children);
    }

    // @ts-ignore
    run(ctx?: any, preRes?: any, ...otherParams: any[]): Promise<R | undefined> {
        const values = this.values;
        new Promise(async (resolve, reject) => {
            ctx = ctx || {};
            try {
                const ps = values.map(item => {
                    ctx.item = item;
                    return super.run(ctx, preRes, ...otherParams)
                })
                const res = await Promise.all(ps);
                resolve(res);
            } catch (err: any) {
                reject(new ActivityError(err && err.message, this));
            }
        });

    }
}

