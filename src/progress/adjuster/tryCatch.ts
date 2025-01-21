import TryCatchActivity from "../../activities/TryCatch";
import { ActivityProgressInfo, AdjustFunction } from "../type";


const handler: AdjustFunction<TryCatchActivity> = function (act: TryCatchActivity) {
    let info: ActivityProgressInfo = {
        name: act.name!,
        type: act.type,
    };

    let children: ActivityProgressInfo[] = []

    const infoMain: ActivityProgressInfo = {
        name: "代码块",
        type: undefined,
    };

    infoMain.children = act.children.map(c => this.getProgress(c));

    children.push(infoMain);

    if (act.catch) {
        const infoCatch: ActivityProgressInfo = {
            name: "catch 代码块",
            type: undefined,
        };
        infoCatch.children = [this.getProgress(act.catch)]
        children.push(infoCatch);
    }

    if (act.finally) {
        const infoF: ActivityProgressInfo = {
            name: "finally 代码块",
            type: undefined,
        };
        infoF.children = [this.getProgress(act.finally)]
        children.push(infoF);
    }

    info.children = children;
    return info
}


export default handler