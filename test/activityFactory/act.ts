
import { IActivityConfig } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityConfig = {
    type: 'sequence',
    name: '如果ctx.count小于5,加加',
    toVariable: "sb",
    context: {
        count: 100
    },
    children: [{
        type: 'code',
        name: 'count加1',
        code: 'console.log($a.sb.ctx.count);'
    }]
}

const activity = createActivity(activityProps);

activity.run();