import { IActivityConfig, createActivity , $} from "../../../src";



const activityProps: IActivityConfig = $.sequence({
    name: "sequence",
    context: {
        url: "https://www.baidu.com",
    },
    children: [
        $.vCreate({
            name: "创建变量",
            options: { name: "v1", value: "vvv1" },
        }),
        $.code({
            name: "输出",
            options: { code: "console.log($v.v1); return $v" },
        }),
        $.vDelete({
            name: "删除变量",
            options: { name: "v1" },
        }),
        $.code({
            name: "输出",
            options: { code: "console.log($v.v1); return $v" },
        }),
    ],
});

const activity = createActivity(activityProps);

activity
    .run()
    .then((res) => {
        console.log("res:", res);
    })
    .catch((err) => {
        console.log("err:", err);
    });
