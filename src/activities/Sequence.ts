import ContainerActivity from "./ContainerActivity";
import Activity from "./Activity";
import { ActivityError } from "../ActivityError";
import BreakActivity from "./Break";
import { IActivityRunParams } from "../types/activity";

export default class SequenceActivity<
    C = any,
    R = any,
    TO = any
> extends ContainerActivity<C, R, TO> {
    buildTask(options?: any) {
        return (paramObj: IActivityRunParams) =>
            new Promise(async (resolve, reject) => {
                let preRes: any;
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    try {
                        // 终止
                        if (child.type === "break") {
                            return resolve((child as BreakActivity).taskOptions);
                        }
                        paramObj.$preRes = preRes;
                        preRes = await child.run(paramObj);
                    } catch (err: any) {
                        return reject(
                            new ActivityError(err && err.message, child)
                        );
                    }
                }
                resolve(preRes);
            });
    }
}
