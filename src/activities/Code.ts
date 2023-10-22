import Activity from "./Activity";

export interface CodeTaskOptions {
    code: string;
}

export default class CodeActivity<C = any, R = any> extends Activity<C, R, CodeTaskOptions> {
    buildTask() {
        return this.buildWithCode(this.taskOptions.code);
    }
}
