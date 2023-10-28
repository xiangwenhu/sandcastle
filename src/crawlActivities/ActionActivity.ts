import { type } from 'os';
import { Page } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";
import { isFunction } from 'lodash';
import { ActivityError } from '../ActivityError';

export type ActionActivityOptions = {
    action: keyof Page;
    args: any[];
}

export default class ActionActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, ActionActivityOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityExecuteParams) => {
            const { action, args } = this.getReplacedOptions(paramObj);
            const actionMethod = this.page![action];
            if (!isFunction(actionMethod)) {
                throw new ActivityError(`page.${action} 不是函数`, this)
            }
            // @ts-ignore
            return actionMethod.apply(this.page!, args)
        }
    }
}