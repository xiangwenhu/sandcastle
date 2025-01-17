import {IActivityConfig, createInstance } from "../../src"



const instance = createInstance();

instance.addMethod("getName",
    function getName() {
        return "name"
    }
);

instance.addConstant("money", 1000);

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

const activity = instance.createActivity(activityProps);

activity.run();