import { ActivityError } from "../ActivityError";
import { IActivityExecuteParams } from "../types/activity";
import SequenceActivity from "./Sequence";

export interface ParallelForActivityOptions<V = any> {
    values: V[];
    itemName: string;
    indexName: string;
}

interface ER {
    $item: any;
    $index: number;
}

export default class ParallelForActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R, ParallelForActivityOptions, ER> {

    buildTask() {
        return (paramObj: IActivityExecuteParams<ER>) => {
            const { values, itemName = "$item", indexName = "$index" } = this.getReplacedOptions(paramObj)

            const superTask = super.buildTask();
            return new Promise(async (resolve, reject) => {
                this.ctx = this.ctx || {};
                try {
                    const ps = values!.map((item, index) => {
                        return superTask.call(this, {
                            ...paramObj,
                            [itemName]: item,
                            [indexName]: index
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
}