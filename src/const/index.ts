import { PuppeteerLaunchOptions } from "puppeteer";

export const PROPERTY_BROWSER: unique symbol = Symbol();
export const PROPERTY_PAGE: unique symbol = Symbol();
export const GLOBAL_BUILTIN: unique symbol = Symbol();
export const GLOBAL_VARIABLES: unique symbol = Symbol();

export const PROPERTY_KEYS = {
    BROWSER: PROPERTY_BROWSER
}

export const DEFAULT_LAUNCH_OPTIONS: PuppeteerLaunchOptions = {
    headless: "new",
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
        '--start-maximized',
        "--no-sandbox",
        "--disable-web-security",
        "--disable-setuid-sandbox",
        "--allow-running-insecure-content",
        "--unsafely-treat-insecure-origin-as-secure"
    ],
    timeout: 60 * 1000,
}

export const ACTIVITY_TASK_BUILTIN_PARAMS_KEYS = [
    "$gCtx",    // 全局上下文
    "$ctx",     // 上下文
    "$c",       // 内置变量
    "$m",       // 内置方法
    "$v",
    "$parent",  // 父节点
    "$preRes",  // 上一个活动的返回值
    "$res",     // 本活动执行完毕的返回值
    "$extra",   // 额外的参数
    "$a",       // 活动节点引用
];