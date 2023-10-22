import { IActivityConfig } from '../../../src/types/activity';
import createActivity from "../../../src/factory/activity"

const activityProps: IActivityConfig = {
    type: 'sequence',
    name: 'sequence',
    children: [ {
        type: 'fs.downloadFile',
        name: '读取文件',
        url: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
        dist: `D:\\data\\tmp2\\cc\\dd\\bd.png`
    }, {
        type: 'code',
        name: '输出内容',
        code: 'console.log("res:", preRes)'
    }]
}




const activity = createActivity(activityProps);
activity.run();