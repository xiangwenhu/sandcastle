import { $, createInstance, IActivityConfig } from '../../src';

import { AxiosRequestConfig } from 'axios';

const activityProps: IActivityConfig = {
    type: 'request',
    name: '请求',
    deepReplace: true,
    replaceArray: true,
    context: {
        url: "https://www.baidu.com",
        options: {
            url: "https://www.jd.com"
        },
        name: "name"
    },
    options: {
        url: "{{$ctx.url}}",
        data: {
            name: "${$ctx.name}aaaaa",
            arr: ["${$ctx.name}", "{{$ctx.options}}"]
        }
    } as AxiosRequestConfig
}

const activity = createInstance(activityProps);
activity.run();

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})