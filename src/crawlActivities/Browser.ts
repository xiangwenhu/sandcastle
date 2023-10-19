import { Browser, PuppeteerLaunchOptions, launch } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import Activity from "../activities/Activity";
import { PROPERTY_BROWSER } from "../const";

export default class BrowserActivity<
    C = any,
    R = any
> extends SequenceActivity<C, R> {

    protected accessor [PROPERTY_BROWSER]: Browser |  undefined = undefined;

    constructor(
        ctx: any,
        children: Activity[],
        public options: PuppeteerLaunchOptions
    ) {
        super(ctx, children);
    }


    async run(ctx?: any, preRes?: any, extra?: any): Promise<any> {
        try {
            this[PROPERTY_BROWSER] = await launch(this.options);
            const res = await super.run(ctx, preRes, extra);
            return res;
        } catch (err) {

        } finally {
            if (!!this[PROPERTY_BROWSER]) {
                // @ts-ignore
                await this[PROPERTY_BROWSER].close();
            }
        }
    }
}
