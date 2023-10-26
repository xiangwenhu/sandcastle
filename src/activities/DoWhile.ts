import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../types/enum";
import { IActivityExecuteParams } from "../types/activity";
import SequenceActivity from "./Sequence";

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
                        // @ts-ignore
                        r = await superTask.call(this, paramObj);

                        // 重复执行，需要调整状态值
                        this.children.forEach(
                            (c) => (c.status = EnumActivityStatus.BUILDED)
                        );
                        this.assert!.status = EnumActivityStatus.BUILDED;
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
