
import { IActivityProps } from './../../src/activityFactory/types';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'request',
    name: '请求',
    context: {
        url: "https://www.baidu.com"
    },
    config: {
        url: "https://www.baidu.com"
    }
}

const activity = createActivity(activityProps);

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})