import { IActivityConfig } from './../../src/types/activity';
import { createActivity } from "../../src/factory/activity";
import { $ } from '../../src/factory/config';


const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence执行",
    children: [
        {
            type: "code",
            name: "打印race开始时间",
            options: { code: `console.log('all开始时间:', new Date())` }
        }, $.race({
            context: {
                name: "race"
            },
            name: "race哈哈",
            children: [{
                useParentCtx: true,
                before: {
                    name: "delay 3000",
                    type: "delay",
                    options: { timeout: 3000 }
                },
                name: "delay 3000",
                type: "code",
                options: { code: "console.log($ctx.name)" }
            }, {
                name: "delay 6000",
                type: "delay",
                options: { timeout: 6000 }
            }]
        }),
        {
            type: "code",
            name: "打印race结束时间",
            options: { code: `console.log('all结束时间:', new Date())` }
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();