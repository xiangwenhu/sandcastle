import { IActivityConfig, createInstance } from "../../../src";


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


const activity = createInstance(activityProps, {
    globalContext: {
        data: {
            name: "name",
            age: 18,
        },
    }
});
activity.run();
