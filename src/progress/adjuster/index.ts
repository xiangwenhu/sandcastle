import { ActivityType } from "../../types";
import { AdjustFunction, IAdjusterMap } from "../type";
import ifElse from "./ifElse";

const map: IAdjusterMap<ActivityType> = new Map();
map.set("ifElse", ifElse as AdjustFunction);


export default map;