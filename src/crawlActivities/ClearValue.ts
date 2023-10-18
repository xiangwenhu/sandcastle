import { isString } from "lodash";
import { ActivityError } from "../ActivityError";
import PageChildActivity from "./PageChildActivity";

export default class ClearValueActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {

    buildTask(selector: string): Function {
        return this.task = async (..._args: any[]) => {
            const page = this.page;
            const el = await page!.$(selector);
            if (!el) {
                throw new ActivityError(`未找到selector的${selector}的节点`, this)
            }
            // @ts-ignore
            const inputValue = await el.evaluate(el => el.value);
            await el?.focus();
            if (isString(inputValue) && inputValue.length > 0) {
                for (let i = 0; i < inputValue!.length; i++) {
                    await page!.keyboard.press("Backspace");
                }
            }
        }
    }
}