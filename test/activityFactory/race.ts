import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: "sequence",
    name: "sequence执行",
    children: [
        {
            type: "code",
            name: "打印race开始时间",
            code: `console.log('all开始时间:', new Date())`
        }, {
            type: "race",
            context: {
                name: "race"
            },
            name: "race哈哈",
            children: [{
                before: {
                    name: "delay 3000",
                    type: "delay",
                    timeout: 3000
                },
                name: "delay 3000",
                type: "code",
                code: "console.log($ctx.name)"
            }, {
                name: "delay 6000",
                type: "delay",
                timeout: 6000
            }]
        },
        {
            type: "code",
            name: "打印race结束时间",
            code:  `console.log('all结束时间:', new Date())`
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();