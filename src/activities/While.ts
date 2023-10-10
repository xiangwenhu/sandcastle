import Activity from "./Activity"
import AssertActivity from "./Assert"
import SequenceActivity from "./Sequence"

export default class WhileActivity<C = any, R = any> extends SequenceActivity<C, R>  {
    private assert: AssertActivity;

    constructor(context: C, condition: string, children: Activity[]) {
        super(context, children)
        this.assert = this.getAssert(condition)
    }

    // @ts-ignore
    buildFunction(condition: string, children: Activity[]) {
        // 设置断言
        if (condition) {
            this.assert = this.getAssert(condition)
        }

        // 构建子活动
        this.children = children || this.children;

        const childrenFun = super.buildFunction();

        // 构建执行函数
        return (...args: any[]) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let r;
                    let assertR: boolean;
                    while ( assertR = await this.assert.run(...args)) {
                        // @ts-ignore
                        r = await childrenFun.apply(this, args)
                    }
                    return resolve(r)
                } catch (err) {
                    return reject(err)
                }
            })
        }
    }

    getAssert(condition: string) {
        // 创建断言Activity
        const assert = new AssertActivity(undefined, condition)
        return assert
    }
}

module.exports = WhileActivity