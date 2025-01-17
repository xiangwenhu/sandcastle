import { $, ActConfigFor, createActivity, IActivityConfig, IActivityExecuteParams, ActivityError } from '../../src';

import { ObjectJSONConverter} from '../../src/util/converter';
import Activity from "../../src/activities/Activity"

const converter = new ObjectJSONConverter();

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
                options: {},
                children: [
                    $.code({
                        name: "内部的code1",
                        options: {
                            code: function (params: IActivityExecuteParams) {
                                console.log("内部的code1:", params.$err?.message);
                            },
                        },
                    }),
                    $.code({
                        name: "内部的code2",
                        options: {
                            code: function (params: IActivityExecuteParams) {
                                console.log("内部的code2:", params.$err?.message);
                                return params.$err
                            },
                        },
                    }),
                ],
            }),
            finally: $.code({
                name: "tryCatch哦 finally",
                options: {
                    code(params) {
                        console.log("finally:", params);
                        // return "finally"
                    },
                },
            }),
        }),
        $.code({
            type: "code",
            name: "tryCatch后输出",
            options: {
                code(params) {
                    console.log("res", params.$preRes);
                    return params.$preRes
                }
            },
        }),
    ],
    catch: $.code({
        type: "code",
        name: "catch后处理函数",
        options: {
            code(params) {
                console.log("params.$err", params.$err?.message)
            }
        },
    }),
};



const jsonObject = converter.toJSON(activityProps as any);

// console.log("jsonObject:", jsonObject);

const configObject = converter.toObject(jsonObject);

// console.log("configObject:", configObject);

const act = createActivity(activityProps);


act.run().then(res => console.log("res:", res))

