import { IActivityProps } from './../../src/types/activity';
import createActivity, { registerMethod, registerVariable } from "../../src/factory/activity"

registerMethod("getName",
    function getName() {
        return "name"
    }
);

registerVariable("money", 1000);

const activityProps: IActivityProps = {
    type: "sequence",
    name: "sequence执行",
    children: [
        {
            type: "code",
            name: "打印all开始时间",
            code: `console.log('all开始时间:', $m.getName(), $v.money)`
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();