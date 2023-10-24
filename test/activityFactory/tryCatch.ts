import { IActivityConfig, ITryCatchActivityConfig } from './../../src/types/activity';
import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance()

const activityProps: ITryCatchActivityConfig = {
    type: 'sequence',
    name: 'tryCatch测试',
    children: [{
        type: "tryCatch",
        name: "tryCatch哦",
        children: [{
            type: "sequence",
            name: "",
            children: [{
                type: "code",
                name: "",
                options: { code: "console.log('catch中的code')" }
            }, {
                type: "terminate",
                name: "",
                options: { message: "终止" }
            }]
        }],
    }, {
        type: "code",
        name: "tryCatch后输出",
        options: { code: "console.log('catch后');" }
    }],
    catch: {
        type: "code",
        name: "catch后处理函数",
        options: { code: "console.log('catch触发后的处理函数');" }
    }
}

const activity = createActivity(activityProps);

; (async function () {
    const r = await activity.run();
    console.log("r:", r);

})()

