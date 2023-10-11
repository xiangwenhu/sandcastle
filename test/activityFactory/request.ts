
import { IActivityProps } from './../../src/activityFactory/types';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'request',
    name: '请求',
    context: {
        url: "https://www.baidu.com"
    },
    config: {
        url: "{{gCtx.url}}" // "${ctx.url}"
    }
}

const activity = createActivity(activityProps, {
    url: "https://www.jd.com"
});

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})