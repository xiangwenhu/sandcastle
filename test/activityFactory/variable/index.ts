import { IActivityConfig } from "../../../src/types/activity";
import createInstance from "../../../src/factory/activity";
const { createActivity } = createInstance();

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    context: {
        url: "https://www.baidu.com",
    },
    children: [
        {
            type: "v.create",
            name: "创建变量",
            options: { name: "v1", value: "vvv1" },
        },
        {
            type: "code",
            name: "输出",
            options: { code: "console.log($v.v1); return $v" },
        },
        {
            type: "v.delete",
            name: "删除变量",
            options: { name: "v1" },
        },
        {
            type: "code",
            name: "输出",
            options: { code: "console.log($v.v1); return $v" },
        },
    ],
};

const activity = createActivity(activityProps);

activity
    .run()
    .then((res) => {
        console.log("res:", res);
    })
    .catch((err) => {
        console.log("err:", err);
    });
