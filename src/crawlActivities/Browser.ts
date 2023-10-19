import { Browser, PuppeteerLaunchOptions, launch } from "puppeteer";
import Activity from "../activities/Activity";
import SequenceActivity from "../activities/Sequence";

export default class BrowserActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {

    #browser: Browser | undefined = undefined;

    get browser() {
        return this.#browser;
    }

    constructor(
        ctx: any,
        children: Activity[],
        public options: PuppeteerLaunchOptions
    ) {
        super(ctx, children);
    }


    async run(ctx?: any, preRes?: any, extra?: any): Promise<any> {
        try {
            this.#browser = await launch(this.options);
            const res = await super.run(ctx, preRes, extra);
            return res;
        } catch (err) {

        } finally {
            if (!!this.#browser) {
                await this.#browser.close();
            }
        }
    }
}
