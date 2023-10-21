import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'parallel',
    name: 'parallel',
    context: {
        name: 1, timeout: 3 * 1000,
    },
    children: [{
        type: 'code',
        name: '最多延时秒',
        code: "console.log($ctx.timeout)"
    }, {
        type: 'code',
        name: '输出当前日期',
        code: 'console.log($ctx.name)'
    }]
}

const activity = createActivity(activityProps);

activity.run();