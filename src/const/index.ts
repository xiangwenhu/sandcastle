import { PuppeteerLaunchOptions } from "puppeteer-core";
import { EnumActivityStatus } from "../types/enum";

export const GLOBAL_BUILTIN_CONTEXT: unique symbol = Symbol("g-builtin-context");

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
    "$v", // 变量，用户创建
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
};
