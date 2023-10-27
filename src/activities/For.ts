import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export interface ForActivityOptions {
    values: any[];
    itemName: string;
    indexName: string;
    continueOnError: boolean;
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
                const { values, itemName = '$item', indexName = '$index', continueOnError = false } = this.getReplacedOptions(paramObj);
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
                        console.log("for:error", $index, $item);
                        console.log("for:error", err)
                        if (!continueOnError) {
                            reject((err));
                            break;
                        }
                    }
                }
                resolve(preRes);
            });
        };
    }

}
