import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../types/enum";
import { IActivityExecuteParams } from "../types/activity";
import SequenceActivity from "./Sequence";
import { registerActivity } from "../activityFactory/factory";

@registerActivity()
export default class DoWhileActivity<C = any, R = any> extends SequenceActivity<
    C,
    R
> {
    buildTask() {
        if (!this.assert) {
            throw new ActivityError("assert 未定义", this);
        }
        // 构建执行函数
        return (paramObj: IActivityExecuteParams) => {
            let superTask = super.buildTask();
            return new Promise(async (resolve, reject) => {
                try {
                    let r;
                    let assertR: boolean;
                    do {

                        // 重复执行，需要调整状态值
                        this.children.forEach(
                            (c) => (c.status = EnumActivityStatus.INITIALIZED)
                        );
                        this.assert!.status = EnumActivityStatus.INITIALIZED;
                        // @ts-ignore
                        r = await superTask.call(this, paramObj);


                    } while ((assertR = await this.assert!.run(paramObj)))
                    return resolve(r);
                } catch (err) {
                    return reject(this.createActivityError(err));
                }
            });
        };
    }
}

module.exports = DoWhileActivity;
