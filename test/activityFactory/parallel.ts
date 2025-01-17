import { $,createInstance, IActivityConfig } from '../../src';

const activityProps: IActivityConfig = {
    type: 'parallel',
    name: 'parallel',
    context: {
        name: 1, timeout: 3 * 1000,
    },
    children: [{
        useParentCtx: true,
        type: 'code',
        name: '最多延时秒',
        options:{code: "console.log($ctx.timeout)"}
    }, {
        useParentCtx: true,
        type: 'code',
        name: '输出当前日期',
        options:{code: 'console.log($ctx.name)'}
    }]
}

const instance = createInstance();
const activity = instance.createActivity(activityProps);

activity.run();