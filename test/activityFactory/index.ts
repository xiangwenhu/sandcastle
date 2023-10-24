import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "顺序集合",
    children: [{
        name: "delay 3000",
        type: "delay",
       options:{ timeout: 3000}
    }, {
        type: "code",
        name: "code输出当前时间",
        options:{ code: "console.log(new Date())"}
    }, {
        type: "sequence",
        name: "顺序集合",
        children: [{
            type: "delay",
            name: "delay 3000",
            options:{ timeout: 3000}
        }, {
            type: "code",
            name: "code输出当前时间",
            options:{ code: "console.log(new Date())"}
        }]
    }]
};

const activity = createActivity(activityProps);

activity.run();