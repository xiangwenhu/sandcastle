import { ProgressManager } from ".";
import Activity from "../activities/Activity";
import { ActivityType, EnumActivityStatus } from "../types";

export interface ActivityProgressInfo {
    type?: ActivityType | string;
    name: string;
    children?: ActivityProgressInfo[];
    status?: EnumActivityStatus;
}



export type AdjustFunction <T extends Activity = Activity> = (this: ProgressManager, act: T) => ActivityProgressInfo;

export type IAdjusterMap<T = string> = Map<T, AdjustFunction>;
