import { IActivityConfig } from '../../src/types/activity';
import { createActivity } from "../../src/factory/activity";

const activityProps: IActivityConfig = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false
    },
    children: [{
        type: "sequence",
        name: "顺序",
        children: [{
            type: "c.page",
            name: "快手页面啊",
            children: [
                {
                    type: "code",
                    name: "代码",
                    options: { code: "console.log(Date.now());" }
                },
                {
                    type: "c.page.action",
                    name: "跳转",
                    options: {
                        action: "goto",
                        args: [
                            "https://www.baidu.com/",
                            {
                                "waitUntil": "load"
                            }
                        ]
                    },

                }, {
                    type: "c.page.action",
                    name: "等待节点",
                    options: {
                        action: "waitForSelector",
                        args: ["#kw"]
                    },
                }, {
                    type: "c.page.type",
                    options: {
                        selector: `#kw`, text: "高源",
                        options: {
                            delay: 1 * 1000
                        },
                    },
                    name: "输入",

                },
                {
                    type: "delay",
                    options: { timeout: 2000 },
                    name: "等待2s"
                },
                {
                    type: "c.page.clearValue",
                    options: { selector: '#kw' }, // TODO::
                    name: "清空值"
                },
                {
                    type: "delay",
                    options: { timeout: 10 * 1000 },
                    name: "等待10s"
                },
            ]
        }
        ]
    }]
};

const activity = createActivity(activityProps);

activity.run().catch(err => {
    console.log("err", err)
});