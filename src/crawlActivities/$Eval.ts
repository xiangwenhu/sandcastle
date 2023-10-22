import PageChildActivity from "./PageChildActivity";

export interface $EvalTaskOptions {
    selector: string;
    pageFunction: Function | string;
    args: any[];
}

export default class $EvalActivity<C = any, R = any> extends PageChildActivity<
    C,
    R
> {
    buildTask(options: $EvalTaskOptions) {
        this.taskOptions = options;
        return (this.task = (..._args: any[]) => {
            const { selector, pageFunction, args } = this.taskOptions;
            return this.page!.$eval(selector, pageFunction, ...args);
        });
    }
}
