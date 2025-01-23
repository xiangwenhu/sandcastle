
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
const activity = createInstance(activityProps, {
    globalContext: {
        url: "https://www.jd.com"
    }
});

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})