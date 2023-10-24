import { isObjectLike, isString } from "lodash";
import { createOneParamFunction } from "../../factory/function";
import { IActivityExecuteParams } from "../../types/activity";
import { ACTIVITY_TASK_BUILTIN_PARAMS_KEYS } from "../../const";
import _ from "lodash";

function createReplaceFunc(code: string, extraParams: string[]) {
    const strkeys = ACTIVITY_TASK_BUILTIN_PARAMS_KEYS.concat(extraParams).map(k => `${k}`);
    const uniKeys = _.uniq(strkeys);
    return createOneParamFunction(code, uniKeys);
}

export function replaceStringVariable(value: string, extraParams: string[]) {
    return (paramObject: Partial<IActivityExecuteParams>) => {
        if (isString(value)) {
            if (value.includes("${")) {
                const rValue = value.replace(/\$\{/gim, "\\${");
                return createReplaceFunc("return \\`" + rValue + "\\`", extraParams)(
                    paramObject
                );
            } else if (value.startsWith("{{") && value.endsWith("}}")) {
                const vName = value.replace(/[{{|}}]/gim, "");
                return createReplaceFunc(`return ${vName}`, extraParams)(paramObject);
            } else {
                return value;
            }
        } else {
            return value;
        }
    };
}

interface ReplaceVariableOptions {
    deep?: boolean,
    replaceArray?: boolean,
    extraKeys?: string[]
}

export function replaceVariable(config: Record<string, any> | string, rOptions: ReplaceVariableOptions = {}) {
    const { extraKeys = [], replaceArray, deep } = rOptions;
    if (!isString(config) && !isObjectLike(config)) {
        return (..._args: any[]) => config;
    }
    if (isString(config)) {
        return function (paramObject: Partial<IActivityExecuteParams>) {
            return replaceStringVariable(config, extraKeys)(paramObject);
        };
    }
    if (!isObjectLike(config)) {
        return (_paramObject: Partial<IActivityExecuteParams>) => config;
    }
    return function (paramObject: Partial<IActivityExecuteParams>) {
        const result: Record<string, any> = {};
        Object.entries(config).forEach(([key, value]) => {
            if (isString(value)) {
                result[key] = replaceStringVariable(value, extraKeys)(paramObject);
            } else if (_.isPlainObject(value)) {
                result[key] = replaceVariable(value, rOptions)(paramObject);
            } else if (replaceArray && _.isArray(value)) {
                result[key] = replaceVariable(value, rOptions)(paramObject);
            } else {
                result[key] = value;
            }
        });
        return result;
    };
}
