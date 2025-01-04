import { IActivityConfig } from "./../../src/types/activity";
import { createActivity } from "../../src/factory/activity";
import { EnumActivityStatus } from "../../src/types/enum";
import { $ }  from "../../src/factory/config"

const activityProps: IActivityConfig = $.sequence({
    name: "如果ctx.count小于5,加加",
    context: {
        count: 1,
    },
    assert:  $.code({
        useParentCtx: true,
        name: "sequence assert",
        options: { code: "return $ctx.count < 5" },
    }),
    children: [
        $.code({
            useParentCtx: true,
            name: "输出count",
            options: { code: 'console.log("count:" + $ctx.count)' },
        }),
        $.delay({
            name: "睡1500ms",
            options: { timeout: 1500 , },
        }),
        $.code({
            useParentCtx: true,
            name: "count加1",
            options: { code: "$ctx.count++" },
        }),
        $.delay({
            name: "睡1500ms",
            options: { timeout: 1500 },
        }),
        $.code({
            useParentCtx: true,
            name: "输出count",
            options: { code: 'console.log("count:" + $ctx.count)' },
        }),
    ],
});

const activity = createActivity(activityProps);

activity.messenger?.on(
    "status",
    function (status: EnumActivityStatus, act: any) {
        // console.log( act.type, act.name, ACTIVITY_STATUS_MAP[status])
        // const progress = getProgress(activity);
// 
        // console.log(progress);
    }
);

activity.run().catch((err) => {
    console.log("error:", err);
});

setTimeout(() => {
    activity.abort("给我停止");
}, 2000);
