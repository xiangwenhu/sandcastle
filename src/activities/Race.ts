import { IActivityExecuteParams } from "../types/activity";
import ContainerActivity from "./ContainerActivity";

export default class RaceActivity<C = any, R = any> extends ContainerActivity<C, R>  {

    buildTask() {
        return (paramObj: IActivityExecuteParams) =>
            Promise.race(this.children.map(act => {
                return act.run(paramObj)
            }))
    }
}
