import { IActivityProps } from './../../src/activityFactory/types';
import createActivity from "../../src/activityFactory"

const activityProps: IActivityProps = {
    type: "sequence",
    name: "顺序集合",
    children: [{
        type: "delay",
        timeout: 3000
    }, {
        type: "code",
        code: "console.log(new Date())"
    }, {
        type: "sequence",
        name: "顺序集合",
        children: [{
            type: "delay",
            timeout: 3000
        }, {
            type: "code",
            code: "console.log(new Date())"
        }]
    }]
};

const activity = createActivity(activityProps);

activity.run();