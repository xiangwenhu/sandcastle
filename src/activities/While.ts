import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import AssertActivity from "./Assert";
import SequenceActivity from "./Sequence";

export default class WhileActivity<C = any, R = any> extends SequenceActivity<
    C,
    R
> {
    constructor(context: C, children: Activity[]) {
        super(context, children);
    }

    accessor assert: AssertActivity | null = null;

    // @ts-ignore
    buildTask(assert: AssertActivity | null, children: Activity[]) {

        // 构建子活动
        this.children = children || this.children;

        let childrenFun = super.buildTask();
        this.assert = assert || this.assert;
        if (!this.assert) {
            throw new ActivityError("assert 未定义", this);
        }
        // 构建执行函数
        return (paramObj: IActivityRunParams) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let r;
                    let assertR: boolean;
                    while ((assertR = await this.assert!.run(paramObj))) {
                        // @ts-ignore
                        r = await childrenFun.apply(this);

                        // 重复执行，需要调整状态值
                        this.children.forEach(c => c.status = EnumActivityStatus.BUILDED);
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
