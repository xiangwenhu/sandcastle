import { $, createActivity, IActivityConfig } from "../../src";


const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence执行",
    context: {
        name: "啊家具",
    },
    children: [
        {
            useParentCtx: true,
            type: "code",
            name: "打印all开始时间",
            options: {
                code: `console.log('all开始时间:', new Date(), $ctx.name)`,
            },
        },
        {
            type: "sequence",
            name: "all哈哈",
            children: [
                {
                    name: "delay 3000",
                    type: "delay",
                    options: { timeout: 3000 },
                },
                {
                    name: "delay 6000",
                    type: "delay",
                    options: { timeout: 6000 },
                },
            ],
        },
        {
            type: "code",
            name: "打印all结束时间",
            options: { code: `console.log('all结束时间:', new Date())`}
        },
    ],
};

const activity = createActivity(activityProps);

activity.run();
