import { Browser, Page } from "puppeteer";
import Activity from "../activities/Activity";
import { PROPERTY_BROWSER, PROPERTY_PAGE } from "../const";

export default class PageChildActivity<C = any, R = any>extends Activity<C, R>  {

    get browser(): Browser | undefined {
        return this.getProperty<Browser>(PROPERTY_BROWSER, true)
    }

    get page(): Page | undefined {
        return this.getProperty<Page>(PROPERTY_PAGE, true)
    }

}

