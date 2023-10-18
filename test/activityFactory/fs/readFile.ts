import { IActivityProps } from '../../../src/types/activity';
import createActivity from "../../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'sequence',
    name: 'sequence',
    children: [ {
        type: 'fs.readFile',
        name: '读取文件',
        contentType: "text",
        dist: `D:\\data\\tmp2\\txt.txt`
    }, {
        type: 'code',
        name: '输出内容',
        code: 'console.log(res)'
    }]
}




const activity = createActivity(activityProps);
activity.run();