
import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()

const activityProps: IActivityConfig = {
    type: 'sequence',
    name: '如果ctx.count小于5,加加',
    context: {
        count: 1
    },
    assert: {
        useParentCtx: true,
        type: "code",
        name: "assert",
        options: {code: 'return $ctx.count < 5'}
    },
    children: [{
        useParentCtx: true,
        type: 'code',
        name: 'count加1',
        options: {code: '$ctx.count++'}
    }, {
        type: 'delay',
        name: '睡500ms',
        options: { timeout: 1500}
    }, {
        useParentCtx: true,
        type: 'code',
        name: '输出count',
        options: { code: 'console.log("count:" + $ctx.count)'}
    }]
}

const activity = createActivity(activityProps);

activity.run();