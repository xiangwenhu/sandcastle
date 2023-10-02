import puppeteer from "puppeteer";
import PPage from "../src/util/page";


; (async function (){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com");

    const ppage = new PPage(page);
    const resHtml = await ppage.fetchText("/");
    console.log("resHtml", resHtml);

})()