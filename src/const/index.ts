import { PuppeteerLaunchOptions } from "puppeteer";
import { EnumActivityStatus } from "../types/enum";

export const PROPERTY_BROWSER: unique symbol = Symbol();
export const PROPERTY_PAGE: unique symbol = Symbol();


// 全局对象上的属性
// 终止状态
export const GLOBAL_TERMINATED = Symbol("g-terminated");
// 终止消息
export const GLOBAL_TERMINATED_MESSAGE = Symbol("g-terminated-message");
// 内置对象
export const GLOBAL_BUILTIN: unique symbol = Symbol("g-builtIn");
// 内置变量
export const GLOBAL_VARIABLES: unique symbol = Symbol("g-variables");
// 信使
export const GLOBAL_MESSENGER: unique symbol = Symbol("g-messenger");
// 日志
export const GLOBAL_LOGGER: unique symbol = Symbol('g-logger');

export const PROPERTY_KEYS = {
    BROWSER: PROPERTY_BROWSER,
};

export const DEFAULT_LAUNCH_OPTIONS: PuppeteerLaunchOptions = {
    headless: "new",
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
        "--start-maximized",
        "--no-sandbox",
        "--disable-web-security",
        "--disable-setuid-sandbox",
        "--allow-running-insecure-content",
        "--unsafely-treat-insecure-origin-as-secure",
    ],
    timeout: 60 * 1000,
};

export const ACTIVITY_TASK_BUILTIN_PARAMS_KEYS = [
    "$gCtx", // 全局上下文
    "$ctx", // 上下文
    "$c", // 内置变量
    "$m", // 内置方法
    "$v",
    "$parent", // 父节点
    "$preRes", // 上一个活动的返回值
    "$res", // 本活动执行完毕的返回值
    "$extra", // 额外的参数
    "$a", // 活动节点引用
];

export const UNDEFINED_HOC = () => undefined;


export const ACTIVITY_STATUS_MAP = {
    [EnumActivityStatus.UNINITIALIZED]: "未初始化",
    [EnumActivityStatus.INITIALIZED]: "已初始化",
    [EnumActivityStatus.BUILDING]: "构建中",
    [EnumActivityStatus.BUILDED]: "构建完毕",
    [EnumActivityStatus.EXECUTING]: "执行中",
    [EnumActivityStatus.EXECUTED]: "执行完毕",
    [EnumActivityStatus.EXCEPTION]: "异常",
    [EnumActivityStatus.TERMINATED]: "终止",
}
