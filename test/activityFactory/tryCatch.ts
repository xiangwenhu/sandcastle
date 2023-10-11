import { IActivityProps } from './../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
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
                code: "console.log('catch中的code')"
            },{
                type: "terminate",
                name: "",
                message: "终止"
            }]
        }],
        catch: {
            type: "code",
            name: "catch后处理函数",
            code: "console.log('catch触发后的处理函数');"
        }
    }, {
        type: "code",
        name: "tryCatch后输出",
        code: "console.log('catch后');"
    }]

}

const activity = createActivity(activityProps);

;(async function(){
    const r = await activity.run();
    console.log("r:", r);
    
})()

