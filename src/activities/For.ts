import { registerActivity } from "../activityFactory/factory";
import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";
import SequenceActivity from "./Sequence";

export interface ForActivityOptions {
    values: any[];
    itemName?: string;
    indexName?: string;
    continueOnError?: boolean;
}



@registerActivity()
export default class ForActivity<C = any, R = any> extends SequenceActivity<
    C,
    R,
    ForActivityOptions
> {

    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const that = this as Activity<any, any, any>;
            return new Promise(async (resolve, reject) => {
                const { values, itemName = '$item', indexName = '$index', continueOnError = false } = this.getReplacedOptions(paramObj);
                let preRes;
                const superTask = super.buildTask();

                for (let index = 0; index < values.length; index++) {
                    const $item = values[index];
                    const $index = index;
                    try {

                        paramObj.$$[indexName] = $index;
                        paramObj.$$[itemName] = $item;

                        preRes = await superTask.call(this, {
                            ...paramObj
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
