import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";

export interface ForActivityOptions {
    values: any[];
    itemName: string;
    indexName: string;
}

interface ER {
    $item: any;
    $index: number;
}

export default class ForActivity<C = any, R = any> extends SequenceActivity<
    C,
    R,
    ForActivityOptions,
    ER
> {

    buildTask() {
        return (paramObj: IActivityExecuteParams<ER>) => {
            const that = this as Activity<any, any, any, ER>;
            return new Promise(async (resolve, reject) => {
                const { values, itemName = '$item', indexName = '$index' } = this.getReplacedOptions(paramObj);
                let preRes;
                const superTask = super.buildTask();

                for (let index = 0; index < values.length; index++) {
                    const $item = values[index];
                    const $index = index;
                    try {
                        preRes = await superTask.call(this, {
                            ...paramObj,
                            [itemName]: $item,
                            [indexName]: $index,
                        });
                    } catch (err: any) {
                        reject(this.createActivityError(err));
                    }
                }
                resolve(preRes);
            });
        };
    }

}
