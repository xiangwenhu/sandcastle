import { registerActivity } from "../activityFactory/factory";
import { ExtendParams, IActivityExecuteParams } from "../types/activity";
import BreakActivity from "./Break";
import ContainerActivity from "./ContainerActivity";

@registerActivity()
export default class SequenceActivity<
    C = any,
    R = any,
    O = any
> extends ContainerActivity<C, R, O> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) =>
            new Promise(async (resolve, reject) => {
                let preRes: any;
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    try {
                        // 终止
                        // if (child.type === "break") {
                        //     const c = child as BreakActivity;
                        //     const { message } = c.getReplacedOptions(paramObj);
                        //     return resolve(message);
                        // }
                        paramObj.$preRes = preRes;
                        preRes = await child.run(paramObj);

                        if (child.type === "break") {
                            return resolve(preRes);
                        }

                    } catch (err: any) {
                        return reject(
                            this.createActivityError(err, child)
                        );
                    }
                }
                resolve(preRes);
            });
    }
}
