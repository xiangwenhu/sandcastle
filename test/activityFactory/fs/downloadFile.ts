import { IActivityConfig } from "../../../src/types/activity";
import createInstance from "../../../src/factory/activity";
const { createActivity } = createInstance();

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    children: [
        {
            type: "fs.downloadFile",
            name: "读取文件",
            options: {
                url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
                dist: `D:\\data\\tmp2\\cc\\dd\\bd.png`,
            },
        },
        {
            type: "code",
            name: "输出内容",
            options: { code: 'console.log("res:", $preRes)' },
        },
    ],
};

const activity = createActivity(activityProps);
activity.run();
