import { isFunction } from "lodash";
import { IActivityExecuteParams, IActivityTaskFunction } from "../types/activity";
import Activity from "./Activity";
import { getFunctionBody } from "../util/function";

export interface CodeActivityOptions {
    code: string;
}

export default class CodeActivity<C = any, R = any> extends Activity<C, R, CodeActivityOptions> {
    buildTask(): IActivityTaskFunction {
        const { code } = this.options;
        if (isFunction(code)) {
            return (paramObject: IActivityExecuteParams) => code.call(null, paramObject)
        }
        return this.buildWithCode(code)
    }
}
