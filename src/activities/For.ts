import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

export default class ForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R, any[]> {

    run(paramObj: IActivityRunParams = {
        $preRes: undefined,
        $extra: {}
    }): Promise<R | undefined> {
        const that = this as Activity;
        return new Promise(async (resolve, reject) => {
            const values = this.replaceVariable(this.taskOptions, paramObj) as any[];
            let preRes;
            for (let i = 0; i < values.length; i++) {
                const val = values[i];
                try {
                    preRes = await super.run({
                        ...paramObj,
                        $item: val
                    })
                } catch (err: any) {
                    reject(new ActivityError(err && err.message, that));
                } finally {
                }
            }
            resolve(preRes);
        });
    }
}

