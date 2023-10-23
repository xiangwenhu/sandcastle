import Activity from "./Activity";

export interface CodeActivityOptions {
    code: string;
}

export default class CodeActivity<C = any, R = any> extends Activity<C, R, CodeActivityOptions> {
    buildTask() {
        return this.buildWithCode(this.options.code);
    }
}
