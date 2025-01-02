import puppeteer from "puppeteer";

(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://www.baidu.com/");

    await page.click(".s-top-left-new .mnav");

    const pages = await browser.pages();

    const page1 = pages[1];
    console.log("pages", pages.length, page1.accessibility);
    // s-top-left-new 
})();
