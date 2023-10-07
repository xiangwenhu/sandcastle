import { EvaluateFuncWith, Page } from "puppeteer";

const CHECK_ELEMENT_CONTENT_OPTIONS = {
    timeout: 30 * 1000
}

class EPage {
    constructor(private page: Page) { }

    /**
     * 从网页发起请求，返回text
     * @param url 
     * @param input 
     * @returns 
     */
    fetchText(url: string, input: RequestInit = {}) {
        return this.page.evaluate(
            (url: string, input: RequestInit) => {
                return window.fetch(url, input).then((res) => res.text());
            },
            url,
            input
        );
    }

    /**
     *  从网页发起请求，返回json
     * @param url 
     * @param input 
     * @returns 
     */
    fetchJSON(url: string, input: RequestInit = {}) {
        return this.page.evaluate(
            (url: string, input: RequestInit) => {
                return window.fetch(url, input).then((res) => res.json());
            },
            url,
            input
        );
    }

    /**
     * 通过文本内容查找节点
     * @param selectAttr 
     * @param text 
     * @returns 
     */
    async findElementByEvaluateText(selectAttr: string, text: string) {
        const label = await this.findElementByEvaluate(selectAttr, (node, data1) => {
            const txt = node.textContent!.trim();
            return txt.includes(data1)
        }, text);
        return label;
    }


    private async findElementByEvaluate(selector: string, pageFunction: EvaluateFuncWith<Element, any[]> | string, ...args: any[]) {
        const eHList = await this.page.$$(selector);
        for (let i = 0; i < eHList.length; i++) {
            const eh = eHList[i];
            const match = await eh.evaluate(pageFunction, ...args);
            if (match) {
                return eh;
            }
        }
        return null;
    }

    /**
     * 查找并执行某些操作
     * @param selector 
     * @param action 
     */
    async evaluateAction(selector: string, action: string) {
        const el = await this.page.$(selector);
        if (!el) {
            throw new Error(`未找到节点:${selector}`)
        }
        await el.evaluate((el: any, actionType: string) => {
            if (!el[actionType]) {
                throw new Error(`节点不存在Action:${actionType}`)
            }
            el[actionType]();
        }, action)
    }

    /**
     * 查找并从页面上点击
     * @param selector 
     * @returns 
     */
    async evaluateClick(selector: string) {
        return this.evaluateAction(selector, "click");
    }

    /**
     * 持续检查某个元素是否存在
     * @param options 
     * @returns 
     */
    async checkElementContent(options: {
        checkFun: (content: string) => boolean,
        selector: string,
        timeout: number;
        interval: number
    }) {
        const opt = {
            ...CHECK_ELEMENT_CONTENT_OPTIONS,
            ...options
        }
        return new Promise((resolve, reject) => {
            let intervalTicket: any;
            let timeOutTicket: any;
            timeOutTicket = setTimeout(() => {
                clearInterval(intervalTicket);
                reject(`checkElementContent 查找内容超时`);
            }, opt.timeout);

            intervalTicket = setInterval(async () => {
                const textContent = await (await this.page.$(opt.selector))?.evaluate(el => el.textContent);
                const match = opt.checkFun(textContent || "");
                if (match) {
                    clearInterval(intervalTicket);
                    clearTimeout(timeOutTicket);
                    resolve(textContent);
                }
            }, options.interval)
        })
    }
}

export default EPage;