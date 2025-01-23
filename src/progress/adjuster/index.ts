import { ActivityType } from "../../types";
import { AdjustFunction, IAdjusterMap } from "../type";
import ifElse from "./ifElse";
import tryCatch from "./tryCatch"

const map: IAdjusterMap<ActivityType> = new Map();
map.set("ifElse", ifElse as AdjustFunction);
map.set("tryCatch", tryCatch as AdjustFunction);

export default map;