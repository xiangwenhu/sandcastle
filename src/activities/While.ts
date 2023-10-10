import { EnumActivityStatus } from "../enum";
import Activity from "./Activity";
import AssertActivity from "./Assert";
import SequenceActivity from "./Sequence";

export default class WhileActivity<C = any, R = any> extends SequenceActivity<
    C,
    R
> {
    constructor(context: C, protected condition: string, children: Activity[]) {
        super(context, children);
    }

    // @ts-ignore
    buildTask(condition: string, children: Activity[]) {
        this.condition = condition || this.condition;

        // 构建子活动
        this.children = children || this.children;

        let childrenFun = super.buildTask();
        let assert = this.getAssert(this.condition);

        // 构建执行函数
        return (...args: any[]) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let r;
                    let assertR: boolean;
                    while ((assertR = await assert.run(...args))) {
                        // @ts-ignore
                        r = await childrenFun.apply(this);

                        assert = this.getAssert(this.condition);
                        // 重复执行，需要调整状态值
                        this.children.forEach(c=> c.status = EnumActivityStatus.BUILDED);
                    }
                    return resolve(r);
                } catch (err) {
                    return reject(err);
                }
            });
        };
    }


    private getAssert(condition: string) {
        // 创建断言Activity
        const assert = new AssertActivity(
            this.ctx,
            `return (${condition})`
        );
        assert.build();
        assert.globalCtx = this.globalCtx;
        return assert;
    }
}

module.exports = WhileActivity;
