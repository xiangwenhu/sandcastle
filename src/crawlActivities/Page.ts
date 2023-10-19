import { Browser, Page } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import BrowserActivity from "./Browser";

export default class PageActivity<C = any, R = any> extends SequenceActivity<C, R>  {

    #page: Page | undefined = undefined;

    get page() {
        return this.#page
    }

    get browser(): Browser | undefined {
        return this.getClosestParent<BrowserActivity>(BrowserActivity)?.browser;
    }

    async run(ctx?: any, preRes?: any, extra?: any): Promise<any> {
        try {
            this.#page = await this.browser!.newPage();
            const res = await super.run(ctx, preRes, extra);
            return res;
        } catch (err) {
            console.log("error:", err);
        }
    }

}
