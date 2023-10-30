import { registerClass } from "../activityFactory/factory";
import BreakActivity, { BreakActivityOptions } from "./Break";

export type TerminateActivityOptions = BreakActivityOptions;

@registerClass()
export default class TerminateActivity<C = any> extends BreakActivity<C> {}
