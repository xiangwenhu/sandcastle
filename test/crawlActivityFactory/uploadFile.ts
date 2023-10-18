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
                    url: "http://127.0.0.1:5501/uploadVideos/index.html",
                    options: {
                        "waitUntil": "load"
                    }
                }, {
                    type: "c.page.waitForSelector",
                    name: "等待节点",
                    selector: "#file",
                }, {
                    type: "c.page.uploadFile",
                    selector: `#file`,
                    paths: ["D:\\data\\tmp2\\1.mp4"],
                    name: "输入",
                    text: "高源",
                    options: {
                        delay: 1 * 1000
                    },
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