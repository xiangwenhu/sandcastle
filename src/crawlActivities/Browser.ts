import { Browser, PuppeteerLaunchOptions, launch } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import Activity from "../activities/Activity";
import { PROPERTY_BROWSER } from "../const";

export default class BrowserActivity extends SequenceActivity {

    public accessor [PROPERTY_BROWSER]: Browser |null = null;

    constructor(
        ctx: any,
        children: Activity[],
        public options: PuppeteerLaunchOptions
    ) {
        super(ctx, children);
    }

    browser(){
        return this[PROPERTY_BROWSER];
    }

    async run(ctx?: any, preRes?: any, ...otherParams: any[]): Promise<any> {
        try {
            this[PROPERTY_BROWSER]= await launch(this.options);
            return super.run(ctx, preRes, ...otherParams);
        } catch (err) {
        } finally {
            if (this[PROPERTY_BROWSER]) {
                await this[PROPERTY_BROWSER].close();
            }
        }
    }
}
