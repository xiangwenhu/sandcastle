import Activity from "./Activity";

export default class CodeActivity<C = any, R = any> extends Activity<C, R> {
    constructor(context: C, private timeout: number) {
        super(context);
    }

    buildTask(timeout?: number) {
        this.timeout = timeout || this.timeout;
        return (_ctx: C, res: any) => {
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(res);
                }, this.timeout);
            });
        };
    }
}
