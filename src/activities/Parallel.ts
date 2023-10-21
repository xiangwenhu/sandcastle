import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import ContainerActivity from "./ContainerActivity";

export default class ParallelActivity<C = any, R = any> extends ContainerActivity<C, R>  {

    buildTask(children: Activity[]) {
        // 构建子活动
        this.children = children || this.children;
        this.childrenUseParentCtx(true);
        return (paramObj: IActivityRunParams) =>
            Promise.all(this.children.map(act => {
                return act.run(paramObj)
            }))
    }
}
