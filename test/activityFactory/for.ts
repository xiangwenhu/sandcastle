import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()

const activityProps: IActivityConfig = {
    type: 'for',
    name: 'for',
    options: { values: [{ name: 1 }, { name: 2 }] },
    children: [{
        useParentCtx: true,
        type: 'delay',
        name: '延时2秒',
        options: { timeout: 1000 * Math.random() }
    }, {
        useParentCtx: true,
        type: 'code',
        name: '输出当前日期',
        options: { code: 'console.log($item.name)' }
    }]
}

const activity = createActivity(activityProps);

activity.run();