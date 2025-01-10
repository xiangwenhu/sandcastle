
const REG_COMMON_FUNCTION = /function[^{]+\{([\s\S]*)\}$/;
const REG_P_FUNCTION = /[^{]+\{([\s\S]*)\}$/;
export function getFunctionBody(fn: Function) {
    const fnStr = fn.toString().trim();
    if (fnStr.startsWith("function")) {
        const matches = fnStr.match(REG_COMMON_FUNCTION);
        if (matches && matches?.length > 1) return matches[1];
        return ""
    }
    const matches = fnStr.match(REG_P_FUNCTION);
    if (matches && matches?.length > 1) return matches[1];
    return ""
}

export const  AsyncFunctionConstructor: FunctionConstructor = (async function fn(){}).constructor as any;

