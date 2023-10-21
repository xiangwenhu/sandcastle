
import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'assertSequence',
    name: '如果ctx.count小于5,加加',
    context: {
        count: 1
    },
    assert: {
        type: "assert",
        name: "assert",
        code: '$ctx.count < 5'
    },
    children: [{
        type: 'code',
        name: 'count加1',
        code: '$ctx.count++'
    }, {
        type: 'delay',
        name: '睡500ms',
        timeout: 1500
    }, {
        type: 'code',
        name: '输出count',
        code: 'console.log("count:" + $ctx.count)'
    }]
}

const activity = createActivity(activityProps);

activity.run();