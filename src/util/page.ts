import { Page } from "puppeteer";

class PPage {
    constructor(private page: Page) {}

    eClick(selector: string) {
        return this.page
            .$(selector)
            .then((elh) =>
                elh?.evaluate((el: Element) => (el as HTMLElement).click())
            );
    }

    fetchText(url: string, input: RequestInit = {}) {
        return this.page.evaluate(
            (url: string, input: RequestInit) => {
                return window.fetch(url, input).then((res) => res.text());
            },
            url,
            input
        );
    }

    fetchJSON(url: string, input: RequestInit = {}) {
        return this.page.evaluate(
            (url: string, input: RequestInit) => {
                return window.fetch(url, input).then((res) => res.json());
            },
            url,
            input
        );
    }

    findElementByText(){
        
    }
}

export default PPage;
