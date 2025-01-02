import { registerActivity } from "../activityFactory/factory";
import BreakActivity, { BreakActivityOptions } from "./Break";

export type TerminateActivityOptions = BreakActivityOptions;

@registerActivity()
export default class TerminateActivity<C = any> extends BreakActivity<C> {}
