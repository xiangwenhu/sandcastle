import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'parallelFor',
    name: 'parallelFor',
    values: [
        { name: 1, timeout: 3 * 1000 }, 
        { name: 2, timeout: 10 * 1000 }
    ],
    children: [{
        type: 'delay',
        name: '最多延时秒',
        timeout: "{{ctx.item.timeout}}"
    }, {
        type: 'code',
        name: '输出当前日期',
        code: 'console.log(ctx.item.name)'
    }]
}

const activity = createActivity(activityProps);

activity.run();