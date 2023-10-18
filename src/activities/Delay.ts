import { isString } from "lodash";
import Activity from "./Activity";

export default class CodeActivity<C = any, R = any> extends Activity<C, R> {
    constructor(context: C, private timeout: number) {
        super(context);
    }

    buildTask(timeout?: number) {
        this.timeout = timeout || this.timeout;
        return (ctx: C, preRes: any) => {
            const tt = isString(this.timeout) ? this.replaceVariable(this.timeout, ctx, preRes) as number: this.timeout;
            return new Promise((resolve, _reject) => {
                setTimeout(function () {
                    resolve(preRes);
                }, tt);
            });
        };
    }
}
