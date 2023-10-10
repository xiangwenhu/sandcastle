import Activity from "./Activity";

export default class CodeActivity<C = any, R = any>extends Activity<C, R> {
    constructor(context: C = {} as C, private code: string) {
        super(context);
    }

    protected buildFunction(code: string) {
        this.code = code || this.code;
        this.fn = this.buildWithCode(this.code);
        return this.fn;
    }
}

