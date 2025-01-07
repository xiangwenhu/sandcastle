import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";
import { ActivityProgressInfo, AdjustFunction, IAdjusterMap } from "./type";
import builtInAdjuster from "./adjuster";


export class ProgressManager {

    private adjuster: IAdjusterMap = new Map(builtInAdjuster.entries());


    addAdjustItems(items: { type: string, func: AdjustFunction } | { type: string, func: AdjustFunction }[]) {
        const list = Array.isArray(items) ? items : [items];

        for (let i = 0; i < list.length; i++) {
            const { type, func } = list[i]
            if (this.adjuster.has(type)) {
                throw new Error(`${type}已存在`)
            }
            this.adjuster.set(type, func);
        }
    }


    private hasAdjustFunc(type: string) {
        return this.adjuster.has(type);
    }

    private getAdjustFunc(type: string) {
        return this.adjuster.get(type)
    }

    getProgress = (act: Activity): ActivityProgressInfo => {

        const type = act.type;

        if (this.hasAdjustFunc(type)) {
            return this.getAdjustFunc(type)!.call(this, act)
        }


        let progress: ActivityProgressInfo = {
            type: act.type,
            name: act.name!,
            status: act.status
        }
        if (!("children" in act)) {
            return progress
        }

        const cAct = act as ContainerActivity;
        progress.children = cAct.children.map(a => this.getProgress(a));
        return progress;
    }

}


export default new ProgressManager();



// export default function getProgress(act: Activity | ContainerActivity): ActivityProgressInfo {

//     let progress: ActivityProgressInfo = {
//         type: act.type,
//         name: act.name!,
//         status: act.status
//     }
//     // @ts-ignore
//     if (!act.children) {
//         return progress
//     }

//     const cAct = act as ContainerActivity;
//     progress.children = cAct.children.map(a => getProgress(a));
//     return progress;
// }