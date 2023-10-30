import { Browser, launch } from "puppeteer";
import SequenceActivity from "../activities/Sequence";
import { IActivityExecuteParams } from "../types/activity";

export interface BrowserActivityEE {
    $browser: Browser;
}

export default class BrowserActivity<C = any, R = any> extends SequenceActivity<
    C,
    R,
    any,
    any,
    BrowserActivityEE
> {
    #browser: Browser | undefined = undefined;

    get browser() {
        return this.#browser;
    }

    buildTask() {
        return (this.task = async (paramObj: IActivityExecuteParams<BrowserActivityEE>) => {
            try {
                const options = this.getReplacedOptions(paramObj);
                this.#browser = await launch(options);
                paramObj.$browser = this.#browser;
                const superTask = super.buildTask();
                const res = await superTask.call(this, paramObj);
                return res;
            } catch (err) {
                throw this.createActivityError(err);
            } finally {
                if (!!this.#browser && this.#browser.connected) {
                    await this.#browser.close();
                }
            }
        });
    }
}
