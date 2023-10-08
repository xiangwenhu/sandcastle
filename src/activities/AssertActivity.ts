import Activity from "./Activity";

export class AssertActivity<C = any> extends Activity<C> {
    constructor(context: C, private code: string) {
        super(context)
        this.type = 'assert'
    }

    build() {
        // this.beforeBuild()
        // this.fn = this.buildWithCode(this.code)
        // return this.fn
    }
}
