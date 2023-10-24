import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { IActivityExecuteParams } from "../types/activity";
import SequenceActivity from "./Sequence";

export default class WhileActivity<C = any, R = any> extends SequenceActivity<
    C,
    R
> {
    buildTask() {
        let childrenFun = super.buildTask();
        if (!this.assert) {
            throw new ActivityError("assert 未定义", this);
        }
        // 构建执行函数
        return (paramObj: IActivityExecuteParams) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let r;
                    let assertR: boolean;
                    while ((assertR = await this.assert!.run(paramObj))) {
                        // @ts-ignore
                        r = await childrenFun.call(this, paramObj);

                        // 重复执行，需要调整状态值
                        this.children.forEach(
                            (c) => (c.status = EnumActivityStatus.BUILDED)
                        );
                        this.assert!.status = EnumActivityStatus.BUILDED;
                    }
                    return resolve(r);
                } catch (err) {
                    return reject(err);
                }
            });
        };
    }
}

module.exports = WhileActivity;
