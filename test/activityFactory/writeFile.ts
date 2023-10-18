import { IActivityProps } from '../../src/types/activity';
import createActivity from "../../src/factory/activity"

const activityProps: IActivityProps = {
    type: 'sequence',
    name: 'sequence',
    children: [{
        type: 'writeFile',
        name: '读取文件',
        content: "{{gCtx.data}}",
        dist: `D:\\data\\tmp2\\txt.json`
    }, {
        type: 'code',
        name: '输出内容',
        code: 'console.log(res)'
    }]
}

const activity = createActivity(activityProps, {
    data: {
        name: "name",
        age: 18
    }
});
activity.run();