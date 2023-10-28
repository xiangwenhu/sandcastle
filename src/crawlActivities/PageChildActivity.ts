import { Browser, Page } from "puppeteer";
import Activity from "../activities/Activity";
import { isFunction } from "lodash";
import PageActivity from "./Page";
import { ExtendParams } from "../types/activity";

export default class PageChildActivity<C = any, R = any, TO = any,ER extends ExtendParams = {}, EE extends ExtendParams = {}> extends Activity<C, R, TO, EE, ER>  {

    get browser(): Browser | undefined {
        return this.page!.browser();
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

