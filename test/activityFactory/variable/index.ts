
import { IActivityProps } from '../../../src/types/activity';
import createActivity from "../../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'sequence',
    name: 'sequence',
    context: {
        url: "https://www.baidu.com"
    },
    children: [{
        type: "v.create",
        name: "创建变量",
        vName: "v1",
        value: "vvv1"
    }, {
        type: "code",
        name: "输出",
        code: "console.log($v.v1); return $v"
    }, {
        type: "v.delete",
        name: "删除变量",
        vName: "v1",
    }, {
        type: "code",
        name: "输出",
        code: "console.log($v.v1); return $v"
    },
    ]

}

const activity = createActivity(activityProps);

activity.run().then(res => {
    console.log("res:", res);
}).catch(err => {
    console.log("err:", err)
})