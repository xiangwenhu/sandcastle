import { Browser, Page } from "puppeteer";
import Activity from "../activities/Activity";
import { isFunction } from "lodash";
import PageActivity from "./Page";

export default class PageChildActivity<C = any, R = any> extends Activity<C, R>  {

    get browser(): Browser | undefined {
        return this.page?.browser();
    }

    get page(): Page | undefined {
        // return this.getProperty<Page>(PROPERTY_PAGE, true)
        return this.getClosestParent<PageActivity>(PageActivity)?.page;
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

