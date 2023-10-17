import Activity from "./Activity";

export default class CodeActivity<C = any, R = any>extends Activity<C, R> {
    constructor(context: C = {} as C, protected code: string) {
        super(context);
    }

    buildTask(code: string) {
        this.code = code || this.code;
        return this.buildWithCode(this.code);
    }
}

