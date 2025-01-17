
import { IActivityConfig, createInstance } from '../../src';

const activityProps: IActivityConfig = {
    type: 'request',
    name: '请求',
    context: {
        url: "https://www.baidu.com"
    },
    options: {
        url: "{{$gCtx.url}}" // "${ctx.url}"
    }
}
const instance = createInstance();
const activity = instance.createActivity(activityProps, {
    url: "https://www.jd.com"
});

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})