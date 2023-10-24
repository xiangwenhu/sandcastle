import { isFunction } from "lodash";
import { IActivityExecuteParams } from "../types/activity";
import { getFunctionBody } from "../util/function";
import PageChildActivity from "./PageChildActivity";

export interface EvaluateActivityOptions {
    code: string | Function; args: any[]
}

export default class EvaluateActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, EvaluateActivityOptions> {

    buildTask() {
        return (this.task = async (paramObj: IActivityExecuteParams) => {
            const { code, args = [] } = this.getReplacedOptions(paramObj);
            // 替换code变量
            let rCode = isFunction(code) ? getFunctionBody(code) : `${code}`;

            const res = await this.page!.evaluate(
                (_code, ..._args) => {
                    const f = new Function(_code);
                    console.log("f:", f.toString());
                    const results = f(..._args);
                    return results;
                },
                rCode,
                ...args
            );
            return res;
        });
    }
}
