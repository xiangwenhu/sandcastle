import { $, createInstance, IActivityConfig } from '../../src';


const activityProps = $.parallelFor({
    name: 'parallelFor',
    context: {
        name: "cname"
    },
    options: {
        values: [
            { name: 'name1', timeout: 3 * 1000 },
            { name: 'name2', timeout: 5 * 1000 }
        ]
    },
    children: [$.delay({
        name: '最多延时秒',
        options: { timeout: "{{$item.timeout}}" }
    }), $.code({
        useParentCtx: true,
        name: '输出当前日期',
        options: { code: 'console.log($item.name,$ctx.name)' }
    })]
})

const instance = createInstance();
const activity = instance.createActivity(activityProps);
activity.run();