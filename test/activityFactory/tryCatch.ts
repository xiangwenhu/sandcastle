import { $,ActConfigFor,createInstance, IActivityConfig, IActivityExecuteParams } from '../../src';

const activityProps: ActConfigFor<"tryCatch"> = {
    type: "tryCatch",
    name: "tryCatch测试",
    children: [
        $.tryCatch({
            name: "tryCatch哦",

            children: [
                {
                    type: "sequence",
                    name: "tryCatch哦 children",
                    children: [
                        {
                            type: "code",
                            name: "",
                            options: { code: "console.log('catch中的code')" },
                        },
                        {
                            type: "code",
                            name: "",
                            options: { code: "xxxxx/yyyyy" },
                        },
                        {
                            type: "terminate",
                            name: "",
                            options: { message: "终止" },
                        },
                    ],
                },
            ],
            catch: $.sequence({
                name: "内部的catch的sequence",
                options: {
                    code: function (err: any) {
                        console.log("内部的catch:", err);
                    },
                },
                children: [
                    $.code({
                        name: "内部的code1",
                        options: {
                            code: function (params: IActivityExecuteParams<{error: any}>) {

                                console.log("内部的code1:", params.$$.error);
                            },
                        },
                    }),
                    $.code({
                        name: "内部的code2",
                        options: {
                            code: function (params: IActivityExecuteParams<{error: any}>) {
                                console.log("内部的code2:", params.$$.error.message);
                            },
                        },
                    }),
                ],
            }),
            finally: $.code({
                name: "tryCatch哦 finally",
                options: {
                    code(act: any) {
                        console.log("finally:", act);
                    },
                },
            }),
        }),
        {
            type: "code",
            name: "tryCatch后输出",
            options: { code: "console.log('catch后');" },
        },
    ],
    catch: {
        type: "code",
        name: "catch后处理函数",
        options: { code: "console.log('catch触发后的处理函数');" },
    },
};

const activity = createInstance(activityProps);
activity.run();

(async function () {
    const r = await activity.run();
    console.log("r:", r);
})();

