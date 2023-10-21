import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import ContainerActivity from "./ContainerActivity";

export default class RaceActivity<C = any, R = any> extends ContainerActivity<C, R>  {

    buildTask(children: Activity[]) {
        // 构建子活动
        this.children = children || this.children

        return (paramObj: IActivityRunParams) =>
            Promise.race(this.children.map(act => {
                act.ctx = this.ctx;
                return act.run(paramObj)
            }))
    }
}
