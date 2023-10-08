import Activity from "./Activity";

export class CodeActivity<C = any> extends Activity<C> {
    constructor(context: C, private code: string) {
        super(context);
    }

    build(code: string) {
        this.code = code || this.code;
        this.fn = this.buildWithCode(this.code);
        return this.fn;
    }
}

