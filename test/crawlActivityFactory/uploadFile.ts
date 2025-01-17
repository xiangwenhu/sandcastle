import { IActivityConfig, createInstance } from '../../src';
import { $ } from '../../src/factory/config';

const activityProps: IActivityConfig =  $.c.browser({
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
                        url: "http://127.0.0.1:5501/uploadVideos/index.html",
                        options: {
                            "waitUntil": "load"
                        }
                    }
                }, {
                    type: "c.page.waitForSelector",
                    name: "等待节点",
                    options: { selector: "#file" },
                }, {
                    type: "c.page.uploadFile",
                    options: {
                        selector: `#file`, paths: ["D:\\data\\tmp2\\1.mp4"],
                        text: "高源",
                        options: {
                            delay: 1 * 1000
                        },
                    },
                    name: "输入",
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
});

const instance = createInstance();
const activity = instance.createActivity(activityProps);


activity.run();