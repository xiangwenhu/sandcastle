import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity";
import { HTTPResponse } from 'puppeteer';

const activityProps: IActivityProps = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false
    },
    children: [
        {
            type: "c.page",
            name: "页面容器",
            children: [
                {
                    type: "c.page.setUserAgent",
                    name: "设置ug",
                    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
                },
                {
                    type: "c.page.goto",
                    name: "跳转",
                    url: "https://www.kuaishou.com/"
                },
                {
                    type: "delay",
                    name: "演示",
                    timeout: 10 * 1000,
                }, {
                    type: "c.page.waitForSelector",
                    name: "等待节点",
                    selector: ".search-input",
                }, {
                    type: "c.page.type",
                    selector: `.search-input`,
                    name: "输入",
                    text: "高源",
                    options: {
                        delay: 1 * 1000
                    }
                },
                {
                    type: "c.page.click",
                    selector: `.search-button`,
                    name: "输入",
                }, {
                    type: "c.page.waitForResponse",
                    name: "waitForResponse",
                    urlOrPredicate: (res: HTTPResponse) => {
                        const request = res.request();
                        const postData = JSON.parse(request.postData() || "{}");
                        if (postData.operationName === 'graphqlSearchUser') {
                            return true
                        }
                        return false
                    }
                }
            ]
        }
    ]
};

const activity = createActivity(activityProps);

activity.run().then(res => {
    console.log("act res:", res);
});