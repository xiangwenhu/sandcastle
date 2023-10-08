function innerCreateFunction(params: string[], code: string): Function {
    const paramsStr = params.map((c) => `'${c}'`).join();
    const funStr = `return new Function(${paramsStr}, '${code}') `;
    return new Function(funStr)();
}

export function createFunction(...args: any[]) {
    if (args.length < 0) {
        return null;
    }
    const code = args.pop();
    return innerCreateFunction(args, `${code}`);
}
export function createPromiseFunction(...args: any[]) {
    if (args.length < 0) {
        return () => {};
    }
    const code = args.pop();
    return innerCreateFunction(
        args,
        `return Promise.resolve().then(()=> {${code}})`
    );
}
