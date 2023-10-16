import { Page } from "puppeteer";
import Activity from "../activities/Activity";

export default class BaseCrawlActivity extends Activity {

    public accessor page: Page | null = null;

    public get browser() {
        return this.page?.browser;
    }

}

