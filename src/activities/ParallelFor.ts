import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

export default class ParallelForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R, any[]> {

    buildTask(options: any[]) {
        this.taskOptions = options;
        return super.buildTask(this.children);
    }

    run(paramObj: IActivityRunParams = this.defaultTaskRunParam): Promise<any> {
        const values = this.taskOptions;
        return new Promise(async (resolve, reject) => {
            this.ctx = this.ctx || {};
            try {
                const ps = values!.map((item) => {
                    return super.run({
                        ...paramObj,
                        $item: item,
                    });
                });
                const res = await Promise.all(ps);
                resolve(res);
            } catch (err: any) {
                reject(new ActivityError(err && err.message, this));
            }
        });
    }
}
