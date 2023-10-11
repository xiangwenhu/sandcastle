import { isObjectLike, isString } from "lodash"
import { createFunction } from "../../factory/function"

function createReplaceFunc(code: string) {
    return createFunction("ctx",    // 上下文
        "res",    // res
        "gCtx",   // 全局上下文
        "parent", // 父活动
        code)

}

export function replaceStringVariable(value: string) {
    return (ctx?: any, res?: any, gCtx?: any, parent?: any) => {
        if (isString(value)) {
            if (value.includes("${")) {
                const rValue = value.replace(/\$\{/img, "\\${");
                return createReplaceFunc("return \\`" + rValue + "\\`")(ctx, res, gCtx, parent)
            } else if (value.startsWith("{{") && value.endsWith("}}")) {
                const vName = value.replace(/[{{|}}]/img, "");
                return createReplaceFunc(`return ${vName}`)(ctx, res, gCtx, parent)
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
        return function (ctx?: any, res?: any, gCtx?: any, parent?: any) {
            return replaceStringVariable(config)(ctx, res, gCtx, parent)
        }
    }

    if (!isObjectLike(config)) {
        return (...args: any) => config;
    }

    return function (ctx: any, res: any, gCtx: any, parent: any) {
        const result: Record<string, any> = {};
        Object.entries(config).forEach(([key, value]) => {
            if (isString(value)) {
                result[key] = replaceStringVariable(value)(ctx, res, gCtx, parent);            }
            else {
                result[key] = value;
            }
        })
        return result;
    }

}