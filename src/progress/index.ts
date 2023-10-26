import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";
import { EnumActivityStatus } from "../types/enum";


interface ActivityProgressInfo {
    name: string;
    children?: ActivityProgressInfo[];
    status: EnumActivityStatus
}

export default function getProgress(act: Activity | ContainerActivity): ActivityProgressInfo {

    let progress: ActivityProgressInfo = {
        name: act.name!,
        status: act.status
    }
    // @ts-ignore
    if (!act.children) {
        return {
            name: act.name!,
            status: act.status
        }
    }

    const cAct = act as ContainerActivity;
    progress.children = cAct.children.map(a => getProgress(a));
    return progress;
}