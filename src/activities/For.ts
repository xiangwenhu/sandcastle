import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";

export default class ForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {
    constructor(context: C, children: Activity[], protected values: any[]) {
        super(context, children);
    }

    // @ts-ignore
    buildTask(children?: Activity[], values: any[]) {
        this.children = children || this.children || [];
        this.values = values || this.values;
        return super.buildTask(this.children);
    }

    run(ctx?: any, preRes?: any, extra?: any): Promise<R | undefined> {
        const that = this as Activity;
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < this.values.length; i++) {
                const val = this.values[i];
                ctx = ctx || {};
                ctx.item = val;
                try {
                    preRes = await super.run(ctx, preRes, extra)
                } catch (err: any) {
                    reject(new ActivityError(err && err.message, that));
                } finally {
                }
            }
            resolve(preRes);
        });
    }
}

