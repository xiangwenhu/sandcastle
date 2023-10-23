import { isBoolean, isFunction, isString } from "lodash";
import { ActivityError } from "../ActivityError";
import { EnumActivityStatus } from "../enum";
import { createOneParamAsyncFunction } from "../factory/function";
import {
    IActivityExecuteParams,
    IActivityTaskFunction,
} from "../types/activity";
import Activity from "./Activity";

export interface CodeActivityOptions {
    code: string;
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
        return this.buildWithCode(code);
    }

    /**
     *
     * @param {代码} code
     */
    buildWithCode(
        code: string
    ): IActivityTaskFunction {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        const g = this.globalBuiltObject;
        const $c = g.properties.placeholder || "$c";
        const $m = g.methods.placeholder || "$m";

        this.task = createOneParamAsyncFunction(code, [
            "$gCtx", // 全局上下文
            "$ctx", // 上下文
            $c, // 内置变量
            $m, // 内置方法
            "$v",
            "$parent", // 父节点
            "$preRes", // 上一个活动的返回值
            "$res", // 本活动执行完毕的返回值
            "$extra", // 额外的参数
            "$item",
            "$index",
            "$a",
        ]) as IActivityTaskFunction;
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }
}
