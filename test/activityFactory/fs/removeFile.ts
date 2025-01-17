import { IActivityConfig, createInstance } from "../../../src";



const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    children: [
        {
            type: "fs.removeFile",
            name: "删除文件",
            options: {
                url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
                dist: `D:\\data\\tmp2\\cc\\dd\\bd.png`,
            },
        },
        {
            type: "code",
            name: "输出内容",
            options: { code: "console.log($preRes)" },
        },
    ],
};


const instance = createInstance();
const activity = instance.createActivity(activityProps);
activity.run();
