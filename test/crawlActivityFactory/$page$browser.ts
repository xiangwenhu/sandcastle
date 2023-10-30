import { PageActivityEE } from '../../src/crawlActivities/Page';
import "../../src/crawlActivityFactory";
import { createActivity } from "../../src/factory/activity";
import { ActConfigFor, IActivityExecuteParams, IFunctionActivityConfig } from '../../src/types/activity';


const activityProps: ActConfigFor<"c.browser"> = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false
    },
    children: [{
        type: "sequence",
        name: "顺序",
        children: [{
            type: "c.page",
            name: "快手页面啊",
            children: [
                {
                    type: "function",
                    name: "代码",
                    task(paramObject: IActivityExecuteParams<PageActivityEE>){
                        console.log("paramObject:", paramObject.$browser);
                    }
                } as IFunctionActivityConfig
            ]
        }
        ]
    }]
}

const activity = createActivity(activityProps);

activity.run().catch(err => {
    console.log("err", err)
});