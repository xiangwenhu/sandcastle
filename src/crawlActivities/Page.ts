import { Browser, Page } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import BrowserActivity from "./Browser";
import { IActivityExecuteParams, IActivityRunParams } from "../types/activity";
import { ActivityError } from "../ActivityError";

export default class PageActivity<C = any, R = any> extends SequenceActivity<C, R>  {

    #page: Page | undefined = undefined;

    get page() {
        return this.#page
    }

    get browser(): Browser | undefined {
        return this.getClosestParent<BrowserActivity>(BrowserActivity)?.browser;
    }

    buildTask() {
        return this.task = async (paramObject: IActivityExecuteParams) => {
            try {
                this.#page = await this.browser!.newPage();
                const superTask = super.buildTask();
                const res = await superTask.call(this, paramObject);
                return res;
            } catch (err: any) {
                throw this.createActivityError(err)
            }
        }
    }

}
