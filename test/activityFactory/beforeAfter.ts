import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'sequence',
    name: 'before after测试',
    children: [{
        before: {
            type: "code",
            name: "code before",
            code: "console.log('code before')"
        },
        type: 'code',
        name: '输出当前日期',
        code: 'return {a:1, b:2}',
        after: '$res.c = 3'
    }, {
        type: 'delay',
        name: '延时2秒',
        timeout: 2000
    }, {
        type: 'code',
        name: '输出当前日期',
        code: 'console.log($preRes)'
    }]
}

const activity = createActivity(activityProps);

activity.run();