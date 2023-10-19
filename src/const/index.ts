import { PuppeteerLaunchOptions } from "puppeteer";

export const PROPERTY_BROWSER: unique symbol = Symbol();
export const PROPERTY_PAGE: unique symbol = Symbol();
export const GLOBAL_BUILTIN: unique symbol = Symbol();

export const  PROPERTY_KEYS  = {
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