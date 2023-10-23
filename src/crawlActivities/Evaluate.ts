import { isFunction } from "lodash";
import { IActivityRunParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";
import { getFunctionBody } from "../util/function";

export interface EvaluateActivityOptions {
    code: string | Function; args: any[]
}

export default class EvaluateActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, EvaluateActivityOptions> {

    buildTask() {
        return (this.task = async (paramObj: IActivityRunParams) => {
            const { code, args = [] } = this.options;
            // 替换code变量
            let rCode = isFunction(code) ? getFunctionBody(code) :  this.replaceVariable(code, paramObj) as string;
            const rArgs = args.map((arg: any) =>
                this.replaceVariable(arg, paramObj)
            );
            const res = await this.page!.evaluate(
                (_code, ..._args) => {
                    const f = new Function(_code);
                    console.log("f:", f.toString());
                    const results = f(..._args);
                    return results;
                },
                rCode,
                ...rArgs
            );
            return res;
        });
    }
}
