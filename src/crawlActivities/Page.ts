import { Browser, Page } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import { PROPERTY_BROWSER, PROPERTY_PAGE } from "../const";

export default class PageActivity<C = any, R = any> extends SequenceActivity<C, R>  {
  
    protected accessor [PROPERTY_PAGE]: Page |  undefined = undefined;

    private getBrowser(): Browser | undefined {
        return this.getProperty<Browser>(PROPERTY_BROWSER, true)
    }

    async run(ctx?: any, preRes?: any, ...otherParams: any[]): Promise<any> {
        try {
            this[PROPERTY_PAGE] = await this.getBrowser()!.newPage();
            const res = await super.run(ctx, preRes, ...otherParams);
            return res;
        } catch (err) {
            console.log("error:", err);
        }
    }

}
