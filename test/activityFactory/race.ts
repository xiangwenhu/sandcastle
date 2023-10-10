import { IActivityProps } from '../../src/activityFactory/types';
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
            name: "race哈哈",
            children: [{
                name: "delay 3000",
                type: "delay",
                timeout: 3000
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