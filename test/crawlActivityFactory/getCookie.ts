import { IActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()
const activityProps: IActivityConfig = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: true
    },
    children: [{
        type: "parallel",
        name: "并行",
        children: [{
            type: "c.page",
            name: "快手页面啊",
            children: [
                {
                    type: "c.page.goto",
                    name: "跳转",
                    options: {
                        url: "https://www.kuaishou.com/?isHome=1",
                        options: {
                            "waitUntil": "load"
                        }
                    }
                },
                {
                    type: "c.page.getCookie",
                    name: "获取cookie"
                },
                {
                    type: "code",
                    name: "输出cookie",
                    options: { code: "console.log('快手res', preRes);" }
                }
            ]
        },
        {
            type: "c.page",
            name: "抖音页面",
            children: [
                {
                    type: "c.page.goto",
                    name: "跳转",
                    options: {
                        url: "https://www.douyin.com/",
                        options: {
                            "waitUntil": "load"
                        }
                    }
                },
                {
                    type: "c.page.getCookie",
                    name: "获取cookie"
                },
                {
                    type: "code",
                    name: "输出cookie",
                    options: { code: "console.log('抖音res', preRes);" }
                }
            ]
        }]
    }]
};

const activity = createActivity(activityProps);

activity.run();