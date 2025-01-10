import ContainerActivity from "../../activities/ContainerActivity";
import IFElseActivity from "../../activities/IfElse";
import { ActivityProgressInfo, AdjustFunction } from "../type";


const handler: AdjustFunction<IFElseActivity> = function (act: IFElseActivity) {
    let info: ActivityProgressInfo = {
        name: act.name!,
        type: act.type,
    };

    let children: ActivityProgressInfo[] = []
    if (act.if) {
        children.push(this.getProgress(act.if))
    }
    if (act.elseif) {
        const infoE: ActivityProgressInfo = {
            name: "elseif 数组",
            type: undefined,
        };
        infoE.children = act.elseif.map(ac => this.getProgress(ac));
        children.push(infoE);
    }
    if (act.else) {
        children.push(this.getProgress(act.else))
    }
    info.children = children;
    return info
}


export default handler