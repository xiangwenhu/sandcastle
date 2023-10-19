import { isObjectLike, isString } from "lodash"
import { createFunction } from "../../factory/function"

function createReplaceFunc(code: string) {
    return createFunction(code,
        "gCtx",    // 全局上下文
        "ctx",     // 上下文
        "$v",        // 内置变量
        "$m",        // 内置方法
        "parent",  // 父节点
        "preRes",  // 上一个活动的返回值
        "res",     // 本活动执行完毕的返回值
        "extra",   // 额外的参数
    )

}

export function replaceStringVariable(value: string) {
    return (ctx: any = {}, preRes: any = undefined, extra: any = {}) => {
        if (isString(value)) {
            if (value.includes("${")) {
                const rValue = value.replace(/\$\{/img, "\\${");
                return createReplaceFunc("return \\`" + rValue + "\\`")(ctx, preRes, extra)
            } else if (value.startsWith("{{") && value.endsWith("}}")) {
                const vName = value.replace(/[{{|}}]/img, "");
                return createReplaceFunc(`return ${vName}`)(ctx, preRes, extra)
            } else {
                return value;
            }
        } else {
            return value;
        }
    }
}

export function replaceVariable(config: Record<string, any> | string) {
    if (!isString(config) && !isObjectLike(config)) {
        return (..._args: any[]) => config;
    }

    if (isString(config)) {
        return function (ctx: any = {}, preRes: any = undefined, extra: any = {}) {
            return replaceStringVariable(config)(ctx, preRes, extra)
        }
    }

    if (!isObjectLike(config)) {
        return (...args: any) => config;
    }

    return function (ctx: any = {}, preRes: any = undefined, extra: any = {}) {
        const result: Record<string, any> = {};
        Object.entries(config).forEach(([key, value]) => {
            if (isString(value)) {
                result[key] = replaceStringVariable(value)(ctx, preRes, extra);
            }
            else {
                result[key] = value;
            }
        })
        return result;
    }

}