
import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()
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

const activity = createActivity(activityProps);

activity.run().then(res => {
    console.log("res:", res.data);
}).catch(err => {
    console.log("err:", err)
})