import { $, IActivityConfig, IFunctionActivityConfig, createInstance } from '../../src';

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "如果ctx.count小于5,加加",
    toVariable: "sb",
    context: {
        count: 100,
    },
    children: [
        {
            type: "code",
            name: "count加1",
            options: {
                // $a.sb.ctx.count 
                code: function (paramsObject: any) {
                    // console.log("paramsObject:", paramsObject);
                }
            },
        }, {
            type: "function",
            name: "task",
            task(paramObj) {
                // console.log("paramObj.$gCtx", paramObj.$gCtx);
                return { results: [] }
            },
        } as IFunctionActivityConfig
        , {
            type: "function",
            name: "task",
            task(paramObj) {
                console.log("paramObj.$preRes", paramObj.$preRes);
            },
        } as IFunctionActivityConfig
    ],
};

const instance = createInstance();
const activity = instance.createActivity(activityProps);

activity.run();
