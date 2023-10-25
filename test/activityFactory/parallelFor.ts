import { IActivityConfig } from '../../src/types/activity';
import { createActivity } from "../../src/factory/activity";


const activityProps: IActivityConfig = {
    type: 'parallelFor',
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
    children: [{
        // useParentCtx: true,
        type: 'delay',
        name: '最多延时秒',
        options: { timeout: "{{$item.timeout}}" }
    }, {
        useParentCtx: true,
        type: 'code',
        name: '输出当前日期',
        options: { code: 'console.log($item.name,$ctx.name)' }
    }]
}

const activity = createActivity(activityProps);

activity.run();