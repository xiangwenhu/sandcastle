import { Browser, Page } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import { IActivityExecuteParams } from "../types/activity";
import BrowserActivity, { BrowserActivityEE } from "./Browser";

export interface PageActivityEE extends BrowserActivityEE{
    $page: Page;
}

export default class PageActivity<C = any, R = any> extends SequenceActivity<
    C,
    R,
    any,
    any,
    PageActivityEE
> {
    #page: Page | undefined = undefined;

    get page() {
        return this.#page;
    }

    get browser(): Browser | undefined {
        return this.getClosestParent<BrowserActivity>(BrowserActivity)?.browser;
    }

    buildTask() {
        return (this.task = async (paramObject: IActivityExecuteParams<PageActivityEE>) => {
            try {
                this.#page = await this.browser!.newPage();
                paramObject.$page = this.#page;
                const superTask = super.buildTask();
                const res = await superTask.call(this, paramObject);
                return res;
            } catch (err: any) {
                throw this.createActivityError(err);
            }
        });
    }
}
