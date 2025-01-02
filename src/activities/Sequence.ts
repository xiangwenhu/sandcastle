import { registerActivity } from "../activityFactory/factory";
import { ExtendParams, IActivityExecuteParams } from "../types/activity";
import BreakActivity from "./Break";
import ContainerActivity from "./ContainerActivity";

@registerActivity()
export default class SequenceActivity<
    C = any,
    R = any,
    O = any,
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> extends ContainerActivity<C, R, O, ER, EE> {
    buildTask() {
        return (paramObj: IActivityExecuteParams<ER>) =>
            new Promise(async (resolve, reject) => {
                let preRes: any;
                for (let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    try {
                        // 终止
                        if (child.type === "break") {
                            const c = child as BreakActivity;
                            const { message } = c.getReplacedOptions(paramObj);
                            return resolve(message);
                        }
                        paramObj.$preRes = preRes;
                        preRes = await child.run(paramObj);
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
