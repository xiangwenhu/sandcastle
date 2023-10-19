import { replaceVariable } from "../../../src/activities/util/variable";

// "gCtx",      // 全局上下文
// "ctx",       // 上下文
// "$c",        // 内置常量
// "$m",        // 内置方法
// "$v",        // 全局变量
// "parent",    // 父节点
// "preRes",    // 上一个活动的返回值
// "res",       // 本活动执行完毕的返回值
// "extra",     // 额外的参数
const r = replaceVariable({
    words: "${ctx.name}, Good Morning, ${ctx.name}",
    words2: "{{ctx.name}}",
})({
    gCtx: {},
    ctx: {
        name: "name"
    },
    $c: {},
    $m: {}, // 内置方法
    $v: {}, // 全局变量
    parent: {} as any, // 父节点
    preRes: {}, // 上一个活动的返回值
    res: {}, // 本活动执行完毕的返回值
    extra: {}, // 额外的参数
});
console.log(r);
