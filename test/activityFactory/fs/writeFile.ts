import { IActivityConfig } from "../../../src/types/activity";
import createActivity from "../../../src/factory/activity";

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    children: [
        {
            type: "fs.writeFile",
            name: "读取文件",
            options: {
                content: "{{$gCtx.data}}",
                dist: `D:\\data\\tmp2\\txt.json`,
            },
            after: "return true",
        },
        {
            type: "code",
            name: "输出内容",
            options: { code: "console.log($preRes)" },
        },
    ],
};

const activity = createActivity(activityProps, {
    data: {
        name: "name",
        age: 18,
    },
});
activity.run();
