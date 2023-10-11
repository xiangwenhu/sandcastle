import BreakActivity from "./Break";

export default class TerminateActivity<C = any> extends BreakActivity<C> {
    constructor(context: C, public message: string = "终止流程") {
        super(context, message)
    }}

