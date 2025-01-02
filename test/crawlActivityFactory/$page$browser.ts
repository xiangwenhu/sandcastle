import { PageActivityEE } from '../../src/crawlActivities/Page';
import "../../src/crawlActivityFactory";
import { createActivity } from "../../src/factory/activity";
import { $$ } from '../../src/factory/config';
import { ActConfigFor, IActivityExecuteParams, IFunctionActivityConfig } from '../../src/types/activity';



const activityProps: ActConfigFor<"c.browser"> = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false
    },
    children: [$$.sequence({
        name: "顺序",
        children: [$$.c.page({
            name: "快手页面啊",
            children: [
                $$.function_({
                    name: "代码",
                    task(paramObject: IActivityExecuteParams<PageActivityEE, any>) {
                        console.log("paramObject:", paramObject.$browser);
                    }
                })
            ]
        })
        ]
    })]
}

const activity = createActivity(activityProps);

activity.run().catch(err => {
    console.log("err", err)
});