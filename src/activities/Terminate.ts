import BreakActivity, { BreakActivityOptions } from "./Break";

export type TerminateActivityOptions = BreakActivityOptions;

export default class TerminateActivity<C = any> extends BreakActivity<C> {}
