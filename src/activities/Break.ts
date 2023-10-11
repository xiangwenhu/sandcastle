import Activity from "./Activity";

/**
 * 终止，可以终止的Activity:
 */
export default class BreakActivity<C = any> extends Activity<C, string> {
    constructor(context: C = {} as C, public message: string) {
        super(context);
    }

    protected buildTask(message: string) {
        this.message = message || this.message
        return (_ctx: C, res: any) => Promise.resolve(this.message)
    }
}

