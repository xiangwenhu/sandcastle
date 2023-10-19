import Activity from "./Activity";
import ContainerActivity from "./ContainerActivity";

export default class ParallelActivity<C = any, R = any> extends ContainerActivity<C, R>  {
    constructor(context: C, children: Activity[]) {
        super(context, children)
    }

    buildTask(children: Activity[]) {
        // 构建子活动
        this.children = children || this.children

        return (ctx: C, preRes: any, extra?: any) =>
            Promise.all(this.children.map(act => act.run(ctx, preRes, extra)))
    }
}
