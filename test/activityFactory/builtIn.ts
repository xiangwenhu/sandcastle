import { IActivityConfig, createInstance } from "../../src"

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

const instance = createInstance(activityProps);

instance.addMethods({
    "getName":
        function getName() {
            return "name"
        }
});

instance.addConstants({ "money": 1000 });

// 多次运行
instance.run().then(() => {
    instance.run();
});

