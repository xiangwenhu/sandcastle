import { IActivityConfig } from "../../src/types/activity";
import createActivity from "../../src/factory/activity";
import { DEFAULT_LAUNCH_OPTIONS } from "../../src/const";

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "爬网啊",
    children: [
        {
            type: "c.browser",
            name: "浏览器",
            options: {
                ...DEFAULT_LAUNCH_OPTIONS,
                headless: false,
            },
            before: {
                type: "v.create",
                name: "创建变量",
                options: { vName: "results", value: [] },
            },
            children: [
                {
                    type: "c.page",
                    name: "页面",
                    children: [
                        {
                            type: "for",
                            name: "遍历",
                            options: "{{$gCtx.cList}}",
                            children: [
                                {
                                    useParentCtx: true,
                                    type: "c.page.goto",
                                    name: "跳转页面",
                                    options: { url: "${$item.url}" },
                                },
                                {
                                    type: "delay",
                                    name: "延时",
                                    options: 2000,
                                },
                                {
                                    type: "doWhile",
                                    name: "遍历爬",
                                    assert: {
                                        type: "sequence",
                                        name: "assert哦",
                                        children: [
                                            {
                                                type: "c.page.$",
                                                name: "查询下一页",
                                                options: {
                                                    selector: `[ka="page-next"].disabled`,
                                                },
                                            },
                                            {
                                                type: "code",
                                                name: "",
                                                options:
                                                    "return $preRes == null",
                                            },
                                        ],
                                    },
                                    children: [
                                        {
                                            type: "c.page.evaluate",
                                            name: "查询节点集合",
                                            options: {
                                                params: [],
                                                code: function () {
                                                    var elCol =
                                                        document.querySelectorAll(
                                                            ".job-card-box"
                                                        );
                                                    return Array.from(
                                                        elCol
                                                    ).map((el: any) => ({
                                                        name: el.querySelector(
                                                            ".job-name"
                                                        ).textContent,
                                                        salary: el.querySelector(
                                                            ".job-salary"
                                                        ).textContent,
                                                    }));
                                                },
                                            },
                                        },
                                        {
                                            type: "code",
                                            name: "存入",
                                            options:
                                                "$v.results.push(...(preRes || []))",
                                        },
                                        {
                                            type: "c.page.eClick",
                                            name: "点击下一页",
                                            options: {
                                                selector: `[ka="page-next"]`,
                                            },
                                        },
                                        {
                                            type: "delay",
                                            options: 5000,
                                            name: "延时5s",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            after: {
                type: "code",
                name: "输出结果",
                options: "return $v.results",
            },
        },
    ],
};

const globalContext = {
    cList: [
        {
            url: "https://www.zhipin.com/gongsi/job/6dfa2217510a0a2203F-3tm_.html?ka=more-similar-jobs1",
            name: "竞技世界",
        },
    ],
};

const activity = createActivity(activityProps, globalContext);

activity
    .run()
    .then((res) => {
        console.log("res:", res);
    })
    .catch((err) => {
        console.log("error:", err);
    });
