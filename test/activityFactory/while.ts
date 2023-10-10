
import { IActivityProps } from './../../src/activityFactory/types';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'while',
    name: '如果ctx.count小于5，加加',
    context: {
        count: 1
    },
    assert: 'ctx.count < 5',
    children: [{
        type: 'code',
        name: 'count加1',
        code: 'ctx.count++'
    }, {
        type: 'delay',
        name: '睡2s',
        timeout: 1500
    }, {
        type: 'code',
        name: '输出count',
        code: 'console.log("count:" + ctx.count)'
    }]
}

const activity = createActivity(activityProps);

activity.run();