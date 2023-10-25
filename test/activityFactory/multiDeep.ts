import { IActivityConfig, IActivityExecuteParams, IFunctionActivityConfig } from './../../src/types/activity';
import { createActivity } from "../../src/factory/activity";



const activityProps: IActivityConfig = {
    type: "for",
    name: "for1",
    options: {
        values: [{ a: 1 }],
        itemName: "$$item",
        indexName: "$$index"
    },
    children: [
        {
            type: "for",
            name: "for2",
            options: {
                values: [{ a: 1 }],
                itemName: "$$$$item",
                indexName: "$$$$index"
            },
            children: [
                {
                    type: "code",
                    name: "打印all开始时间",
                    options: { code: `console.log('$$item:', $$item,'$$$$item:', $$$$item);` }
                },
                {
                    type: "function",
                    name: "打印all开始时间",
                    task(paramObj: any) {
                        console.log("paramObj:", paramObj);
                    }
                } as IFunctionActivityConfig,
            ]

        },
        {
            type: "code",
            name: "打印all开始时间",
            options: { code: `console.log('$$item:', $$item)` }
        }, {
            type: "sequence",
            name: "子",
            children: [{
                type: "function",
                name: "子子",
                task: function (paramObj: IActivityExecuteParams<{
                    $$item: any;
                    $$index: number;
                }>) {
                    console.log("paramObj", paramObj.$$item);
                }
            } as IFunctionActivityConfig]
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();