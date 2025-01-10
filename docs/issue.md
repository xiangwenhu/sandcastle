## Bug fix 
- [x]  $.c.page.evaluate 如果是属性方法报错的问题，本质是 src\util\function.ts 的 getFunctionBody 未获取正确的函数体部分
```typescript
$.c.page.evaluate({
    name: "获取节点内容",
    options: {
        args: [],
        code: function code() {
            // @ts-ignore
            const links = document.querySelector(`[class^=container-bg]`).querySelectorAll(`a[class^="title_"]`) as any as HTMLAnchorElement[];

            return Array.from(links).map(l => ({
                href: l.getAttribute("href"),
                title: l.textContent || ''
            }))
        }
    }
})
```
两处改进
```typescript
buildTask() {
    return (this.task = async (paramObj: IActivityExecuteParams) => {
        const { code, args = [] } = this.getReplacedOptions(paramObj);
        // 替换code变量
        let rCode = isFunction(code) ? getFunctionBody(code) : `${code}`;

        const res = await this.page!.evaluate(
            async (_code, ..._args) => {
                // 异步方法构造，以支持异步方法
                const  AsyncFunctionConstructor: FunctionConstructor = (async function fn(){}).constructor as any;
                const f = new AsyncFunctionConstructor(_code);
                console.log("f:", f.toString());
                const results = await f(..._args);
                return results;
            },
            rCode,
            ...args
        );
        return res;
    });
}
```
```typescript
// 可以考虑合并为一个政策
const REG_COMMON_FUNCTION = /function[^{]+\{([\s\S]*)\}$/;  // 带function
const REG_P_FUNCTION = /[^{]+\{([\s\S]*)\}$/;               // 属性方法，不带 function
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
```
