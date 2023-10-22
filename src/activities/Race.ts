import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import ContainerActivity from "./ContainerActivity";

export default class RaceActivity<C = any, R = any> extends ContainerActivity<C, R>  {

    buildTask() {
        return (paramObj: IActivityRunParams) =>
            Promise.race(this.children.map(act => {
                return act.run(paramObj)
            }))
    }
}
