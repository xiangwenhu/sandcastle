import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

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

    run(paramObj: IActivityRunParams = {
        preRes:undefined,
        extra:{}
    }): Promise<R | undefined> {
        const that = this as Activity;
        return new Promise(async (resolve, reject) => {
            let preRes;
            for (let i = 0; i < this.values.length; i++) {
                const val = this.values[i];
                this.ctx!.item = val;
                try {
                    preRes = await super.run(paramObj)
                    paramObj.preRes = preRes;
                } catch (err: any) {
                    reject(new ActivityError(err && err.message, that));
                } finally {
                }
            }
            resolve(preRes);
        });
    }
}

