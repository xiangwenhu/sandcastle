import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'for',
    name: 'for',
    values: [{ name: 1 }, { name: 2 }],
    children: [ {
        type: 'delay',
        name: '延时2秒',
        timeout: 5000 * Math.random()
    }, {
        type: 'code',
        name: '输出当前日期',
        code: 'console.log(ctx.item.name)'
    }]
}

const activity = createActivity(activityProps);

activity.run();