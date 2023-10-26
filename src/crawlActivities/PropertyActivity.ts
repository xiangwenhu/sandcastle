import { isFunction } from 'lodash';
import { Page } from "puppeteer";
import { IActivityExecuteParams } from "../types/activity";
import PageChildActivity from "./PageChildActivity";

export type PropertyActivityTaskOptions = {
    property: keyof Page;
}

export default class PropertyActivity<
    C = any,
    R = any
> extends PageChildActivity<C, R, PropertyActivityTaskOptions> {

    buildTask() {
        return this.task = (paramObj: IActivityExecuteParams) => {
            const { property } = this.getReplacedOptions(paramObj);
            const propertyValue = this.page![property];
            return propertyValue;
        }
    }
}