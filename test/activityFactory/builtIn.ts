import { addMethod, addConstant, createActivity, IActivityConfig } from "../../src"

addMethod("getName",
    function getName() {
        return "name"
    }
);

addConstant("money", 1000);

const activityProps: IActivityConfig = {
    type: "sequence",
    name: "sequence执行",
    children: [
        {
            type: "code",
            name: "打印all开始时间",
            options: { code: `console.log('all开始时间:', $m.getName(), $c.money)` }
        }
    ]
};

const activity = createActivity(activityProps);

activity.run();