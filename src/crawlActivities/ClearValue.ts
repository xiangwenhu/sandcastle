import { isString } from "lodash";
import { ActivityError } from "../ActivityError";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";
import { KeyInput, KeyPressOptions } from "puppeteer";

export interface ClearValueActivityOptions {
    key: KeyInput,
    options?: Readonly<KeyPressOptions> | undefined
}

export default class ClearValueActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ClearValueActivityOptions> {
    buildTask() {
        return (this.task = async (paramObj: IActivityRunParams) => {
            const page = this.page;
            const el = await page!.$(this.options.key);
            if (!el) {
                throw new ActivityError(
                    `未找到selector的${this.options}的节点`,
                    this
                );
            }
            // @ts-ignore
            const inputValue = await el.evaluate((el) => el.value);
            await el?.focus();
            if (isString(inputValue) && inputValue.length > 0) {
                for (let i = 0; i < inputValue!.length; i++) {
                    await page!.keyboard.press("Backspace", this.options.options);
                }
            }
        });
    }
}
