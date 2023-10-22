import { isString } from "lodash";
import { ActivityError } from "../ActivityError";
import PageChildActivity from "./PageChildActivity";
import { IActivityRunParams } from "../types/activity";

export default class ClearValueActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R> {
    buildTask(options: string) {
        this.taskOptions = options;
        return (this.task = async (paramObj: IActivityRunParams) => {
            const page = this.page;
            const el = await page!.$(this.taskOptions);
            if (!el) {
                throw new ActivityError(
                    `未找到selector的${this.taskOptions}的节点`,
                    this
                );
            }
            // @ts-ignore
            const inputValue = await el.evaluate((el) => el.value);
            await el?.focus();
            if (isString(inputValue) && inputValue.length > 0) {
                for (let i = 0; i < inputValue!.length; i++) {
                    await page!.keyboard.press("Backspace");
                }
            }
        });
    }
}
