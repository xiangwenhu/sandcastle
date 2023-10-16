import { Page } from "puppeteer";
import SequenceActivity from "../activities/Sequence";

export default class BrowserActivity extends SequenceActivity {
    public accessor page: Page | null = null;

}
