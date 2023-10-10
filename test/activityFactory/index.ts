import { IActivityProps } from './../../src/activityFactory/types';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: "sequence",
    name: "顺序集合",
    children: [{
        name: "delay 3000",
        type: "delay",
        timeout: 3000
    }, {
        type: "code",
        name: "code输出当前时间",
        code: "console.log(new Date())"
    }, {
        type: "sequence",
        name: "顺序集合",
        children: [{
            type: "delay",
            name: "delay 3000",
            timeout: 3000
        }, {
            type: "code",
            name: "code输出当前时间",
            code: "console.log(new Date())"
        }]
    }]
};

const activity = createActivity(activityProps);

activity.run();