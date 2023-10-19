import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity";

const activityProps: IActivityProps = {
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
                    url: "https://www.kuaishou.com/?isHome=1",
                    options: {
                        "waitUntil": "load"
                    }
                },
                {
                    type: "c.page.fetch",
                    url: "/",
                    name: "fetch 页面内容",
                    contentType: "text"
                },
                {
                    type: "code",
                    name: "输出cookie",
                    code: "console.log('fetch res:', preRes);"
                }
            ]
        }
      ]
    }]
};

const activity = createActivity(activityProps);

activity.run();