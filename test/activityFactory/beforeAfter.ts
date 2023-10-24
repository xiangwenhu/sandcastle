import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()

const activityProps: IActivityConfig = {
    type: 'sequence',
    name: 'before after测试',
    children: [{
        before: {
            type: "code",
            name: "code before",
            options: { code: "console.log('code before')" }
        },
        type: 'code',
        name: '设置一个值',
        options: { code: 'return {a:1, b:2}' },
        after: '$preRes.c = 3'
    }, {
        type: 'delay',
        name: '延时2秒',
        options: { timeout: 2000 }
    }, {
        type: 'code',
        name: '输出当前日期',
        options: { code: 'console.log($preRes)' }
    }]
}

const activity = createActivity(activityProps);

activity.run();