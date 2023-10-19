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
                    type: "code",
                    name: "代码",
                    code: "console.log(Date.now());"
                },
                {
                    type: "c.page.goto",
                    name: "跳转",
                    url: "https://www.baidu.com/",
                    options: {
                        "waitUntil": "load"
                    }
                }, {
                    type: "c.page.waitForSelector",
                    name: "等待节点",
                    selector: "#kw",
                }, {
                    type: "c.page.type",
                    selector: `#kw`,
                    name: "输入",
                    text: "高源",
                    options: {
                        delay: 1 * 1000
                    },
                },
                {
                    type: "delay",
                    timeout: 2000,
                    name: "等待2s"
                },
                {
                    type: "c.page.clearValue",
                    selector: '#kw',
                    name: "清空值"
                },
                {
                    type: "delay",
                    timeout: 10 * 1000,
                    name: "等待10s"
                },
            ]
        }
        ]
    }]
};

const activity = createActivity(activityProps);

activity.run();