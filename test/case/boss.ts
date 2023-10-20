import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity";

const activityProps: IActivityProps = {
    type: "sequence",
    name: "爬网啊",
    children: [
        {
            type: "browser",
            name: "浏览器",
            before: {
                type: "v.create",
                name: "创建变量",
                vName: "results",
                value: [],
            },
            children: [
                {
                    type: "page",
                    name: "页面",
                    children: [
                        {
                            type: "for",
                            name: "遍历",
                            values: "{{gCtx.cList}}",
                            children: [
                                {
                                    type: "c.page.goto",
                                    name: "跳转页面",
                                    url: "${ctx.item.url}"
                                },
                                {
                                    type: "while",
                                    name: "遍历爬",
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

const globalContext = {
    cList: [{
        url: "https://www.zhipin.com/gongsi/job/36371f7bace397881nN-29Q~.html?ka=company-jobs",
        name: "竞技世界"
    }]
};

const activity = createActivity(activityProps, globalContext);

activity.run();