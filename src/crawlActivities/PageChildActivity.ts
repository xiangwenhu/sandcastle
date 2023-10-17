import { Browser, Page } from "puppeteer";
import Activity from "../activities/Activity";
import { PROPERTY_BROWSER, PROPERTY_PAGE } from "../const";
import { isFunction } from "lodash";

export default class PageChildActivity<C = any, R = any> extends Activity<C, R>  {

    get browser(): Browser | undefined {
        return this.getProperty<Browser>(PROPERTY_BROWSER, true)
    }

    get page(): Page | undefined {
        return this.getProperty<Page>(PROPERTY_PAGE, true)
    }

    action<R = any>(propertyName: keyof Page, ...args: any[]): Promise<R> {
        const page = this.page;
        const property = page![propertyName];
        if (!isFunction(property)) {
            return Promise.resolve(property as R);
        }
        return (property as Function).call(page, ...args);
    }


}

