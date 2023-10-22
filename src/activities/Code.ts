import Activity from "./Activity";

export default class CodeActivity<C = any, R = any>extends Activity<C, R> {
    buildTask(options: string) {
        this.taskOptions = options;
        return this.buildWithCode(this.taskOptions);
    }
}

