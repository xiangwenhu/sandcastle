import { PageActivityEE } from '../../src/crawlActivities/Page';
import "../../src/crawlActivityFactory";
import { createActivity } from "../../src/factory/activity";
import { $ } from '../../src/factory/config';
import { ActConfigFor, ExtendParams, IActivityExecuteParams,  IFunctionActivityConfig } from '../../src/types/activity';


const activityProps: ActConfigFor<"c.browser"> = {
    type: "c.browser",
    name: "创建浏览器",
    options: {
        headless: false,
        "executablePath": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    
    },
    children: [$.sequence({
        name: "顺序",
        children: [$.c.page({
            name: "快手页面啊",    
            children: [
                $.c.page.goto({
                    name: "",
                    options: {
                        url: "https://www.baidu.com",
                        options: {
                            waitUntil: "domcontentloaded"
                        }
                    }
                }),
                $.function_({
                    name: "代码",
                    async task(paramObject: IActivityExecuteParams<PageActivityEE>) {    
                        const title = await paramObject.$$.$page.title();        
                        console.log("page title:", title);
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