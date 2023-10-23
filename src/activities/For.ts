import Activity from "./Activity";
import SequenceActivity from "./Sequence";
import { ActivityError } from "../ActivityError";
import { IActivityRunParams } from "../types/activity";

export interface ForActivityOptions {
    values: any[];
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
    run(
        paramObj: IActivityRunParams<ER> = {
            $preRes: undefined,
            $extra: {},
        } as any
    ): Promise<R | undefined> {
        const that = this as Activity;
        return new Promise(async (resolve, reject) => {
            const values = this.replaceVariable(
                this.options.values,
                paramObj
            ) as any[];
            let preRes;
            for (let index = 0; index < values.length; index++) {
                const $item = values[index];
                const $index = index;
                try {
                    preRes = await super.run({
                        ...paramObj,
                        $item,
                        $index,
                    });
                } catch (err: any) {
                    reject(new ActivityError(err && err.message, that));
                } finally {
                }
            }
            resolve(preRes);
        });
    }
}
