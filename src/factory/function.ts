import { BuiltInMethods, BuiltInProperties } from "../types/factory";

function innerCreateFunction(params: string[], code: string): Function {
    const paramsStr = params.map((c) => `'${c}'`).join();

    const funStr = `return new Function(${paramsStr}, \`${code}\`) `;
    return new Function(funStr)();
}

export function createFunction(code: string, ...args: string[]) {
    if (arguments.length < 0) {
        return () => { };
    }
    return innerCreateFunction(args, `${code}`);
}
export function createPromiseFunction(code: string, ...args: string[]) {
    if (arguments.length < 0) {
        return () => { };
    }
    return innerCreateFunction(
        args,
        `return Promise.resolve().then(()=> {${code}})`
    );
}


export function createFunctionWithExtraParams(code: string, ...args: string[]) {
    return (properties: BuiltInProperties = {
        placeholder: "$v",
        properties: {}
    }, methods: BuiltInMethods = {
        placeholder: "$m",
        properties: {}
    }) => {
        const cArgNames = args.concat([properties.placeholder || "$v", methods.placeholder || "$m"]);
        return (...args: any[]) => {
             const argList = [...args, properties.properties, methods.properties];
            return createFunction(code, ...cArgNames).apply(null, argList)
        }
    }
}

