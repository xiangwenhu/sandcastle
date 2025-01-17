import { $, createInstance, IActivityConfig, IActivityExecuteParams } from "../../../src";

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence",
    children: [
        $.fsDownloadFile({
            name: "读取文件",
            options: {
                url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
                dist: `D:\\data\\tmp2\\cc\\dd\\bd.png`,
            },
        }),
        $.code({
            name: "输出内容",
            options: {
                code(res: IActivityExecuteParams) {
                    console.log("res:", res.$preRes)
                }
            },
        }),
    ],
};


const instance = createInstance();
const activity = instance.createActivity(activityProps);
activity.run();
