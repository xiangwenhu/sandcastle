import { IActivityConfig, createActivity } from "../../../src";



const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    children: [
        {
            type: "fs.readFile",
            name: "读取文件",
            options: { contentType: "text", dist: `D:\\data\\tmp2\\txt.txt` },
        },
        {
            type: "code",
            name: "输出内容",
            options: { code: "console.log($preRes)" },
        },
    ],
};

const activity = createActivity(activityProps);
activity.run();
