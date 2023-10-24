import { isBoolean, isFunction, isString } from "lodash";
import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { createOneParamAsyncFunction } from "../factory/function";
import {
    IActivityExecuteParams,
    IActivityTaskFunction,
} from "../types/activity";
import Activity from "./Activity";
import { ACTIVITY_TASK_BUILTIN_PARAMS_KEYS } from "../const";
import _ from "lodash";
import { extractOwnOtherKeys } from "../util";

export interface CodeActivityOptions {
    code: string | Function;
}

export default class CodeActivity<C = any, R = any> extends Activity<
    C,
    R,
    CodeActivityOptions
> {
    buildTask() {
        const { code } = this.options;
        if (isFunction(code)) {
            return (paramObject: IActivityExecuteParams) =>
                code.call(null, paramObject);
        }

        return (paramObject: IActivityExecuteParams) => {
            const extraKeys = extractOwnOtherKeys(paramObject, ACTIVITY_TASK_BUILTIN_PARAMS_KEYS)
            return this.buildWithCode(`${code}`, extraKeys as string[]).call(null, paramObject);
        }
    }

    /**
     *
     * @param {代码} code
     */
    buildWithCode(
        code: string,
        extraParams: string[] = []
    ): IActivityTaskFunction {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        const g = this.globalBuiltObject;


        const paramKeys = ACTIVITY_TASK_BUILTIN_PARAMS_KEYS.concat(extraParams);

        this.task = createOneParamAsyncFunction(code, paramKeys) as IActivityTaskFunction;
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }
}
