import { $,createActivity, IActivityConfig, IActivityExecuteParams } from '../../src';


const activityProps = $.for_({
    name: "for1",
    options: {
        values: [{ a: 1 }],
        itemName: "$$item",
        indexName: "$$index",
        continueOnError: true
    },
    children: [
        $.for_({
            name: "for2",
            options: {
                values: [{ aaa: 1 }],
                itemName: "$$$$item",
                indexName: "$$$$index",
                continueOnError: true
            },
            children: [
                $.code({
                    name: "打印all开始时间",
                    options: { code: `console.log('$$item:', $$.$$item,'$$$$item:', $$.$$$$item);` }
                }),
                $.function_(
                    {
                        name: "打印all开始时间",
                        task(paramObj: any) {
                            console.log("paramObj:", paramObj);
                        }
                    }),
            ]

        }),
        $.code({
            name: "打印all开始时间",
            options: { code: `console.log('$$.$$item:', $$.$$item)` }
        }), $.sequence({
            name: "子",
            children: [$.function_({
                name: "子子",
                task: function (paramObj: IActivityExecuteParams<{
                    $$item: any;
                    $$index: number;
                }>) {
                    console.log("paramObj", paramObj.$$.$$item);
                }
            })]
        })
    ]
});

const activity = createActivity(activityProps);

activity.run();