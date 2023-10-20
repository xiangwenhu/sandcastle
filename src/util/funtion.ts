
const REG_FUNCTION = /function[^{]+\{([\s\S]*)\}$/;
export function getFunctionBody(fn: Function) {
    // @ts-ignore
    return fn.toString().match(REG_FUNCTION)[1]
}