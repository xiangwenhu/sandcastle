import { $, createInstance, IActivityConfig } from "../../src";

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "如果ctx.count小于5,加加",
    toVariable: "sb",
    context: {
        count: 100,
    },
    children: [
        $.code({
            name: "count加1",
            options: {
                // $a.sb.ctx.count 
                code: function (paramsObject: any) {
                    console.log("paramsObject:", paramsObject);
                }
            } ,
        }),
    ],
};


const activity = createInstance(activityProps);
activity.run();
