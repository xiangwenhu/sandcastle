import { IActivityConfig } from '../../src/types/activity';
import { createActivity } from "../../src/factory/activity";
import "../../src/crawlActivityFactory";

const activityProps: IActivityConfig = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false
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
                    type: "c.page.fetch",
                    options: { url: "/", contentType: "text" },
                    name: "fetch 页面内容",

                },
                {
                    type: "code",
                    name: "输出cookie",
                    options: { code: "console.log('fetch res:', $preRes);" }
                }
            ]
        }
        ]
    }]
};

const activity = createActivity(activityProps);

activity.run();