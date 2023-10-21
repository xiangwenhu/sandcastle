import { isObjectLike, isString } from "lodash";
import { createOneParamFunction } from "../../factory/function";
import { IActivityExecuteParams } from "../../types/activity";

function createReplaceFunc(code: string) {
    return createOneParamFunction(code, [
        "$gCtx", // 全局上下文
        "$ctx", // 上下文
        "$c", // 内置常量
        "$m", // 内置方法
        "$v", // 全局变量
        "$parent", // 父节点
        "$preRes", // 上一个活动的返回值
        "$res", // 本活动执行完毕的返回值
        "$extra", // 额外的参数
        "$item",   // 集合处理的item
        "$a"
    ]);
}

export function replaceStringVariable(value: string) {
    return (paramObject: Partial<IActivityExecuteParams>) => {
        if (isString(value)) {
            if (value.includes("${")) {
                const rValue = value.replace(/\$\{/gim, "\\${");
                return createReplaceFunc("return \\`" + rValue + "\\`")(
                    paramObject
                );
            } else if (value.startsWith("{{") && value.endsWith("}}")) {
                const vName = value.replace(/[{{|}}]/gim, "");
                return createReplaceFunc(`return ${vName}`)(paramObject);
            } else {
                return value;
            }
        } else {
            return value;
        }
    };
}

export function replaceVariable(config: Record<string, any> | string) {
    if (!isString(config) && !isObjectLike(config)) {
        return (..._args: any[]) => config;
    }

    if (isString(config)) {
        return function (paramObject: Partial<IActivityExecuteParams>) {
            return replaceStringVariable(config)(paramObject);
        };
    }

    if (!isObjectLike(config)) {
        return (paramObject: Partial<IActivityExecuteParams>) => config;
    }

    return function (paramObject: Partial<IActivityExecuteParams>) {
        const result: Record<string, any> = {};
        Object.entries(config).forEach(([key, value]) => {
            if (isString(value)) {
                result[key] = replaceStringVariable(value)(paramObject);
            } else {
                result[key] = value;
            }
        });
        return result;
    };
}
