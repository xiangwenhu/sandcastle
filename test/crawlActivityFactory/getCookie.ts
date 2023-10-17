import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity";

const activityProps: IActivityProps = {
    type: "c.browser",
    name: "创建浏览器",
    children: [
        {
            type: "c.page",
            name: "页面啊",
            children: [
                {
                    type: "c.page.goto",
                    name: "跳转",
                    url: "https://www.douyin.com/",
                    options: {
                        "waitUntil": "load"
                    }
                },
                {
                    type: "c.page.getCookie",
                    name: "获取cookie"
                },
                {
                    type: "code",
                    name: "输出cookie",
                    code: "console.log('res', res);"
                }
            ]
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();