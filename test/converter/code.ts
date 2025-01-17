import {ObjectJSONConverter } from '../../src/util/converter';
import { $, createActivity, IActivityConfig } from '../../src';
import Activity from "../../src/activities/Activity"


const converter = new ObjectJSONConverter();

const config: IActivityConfig = $.code({
    type: "code",
    name: "如果ctx.count小于5,加加",
    before: $.code({
        type: "code",
        name: "code执行前代码",
        useParentCtx: true,
        options: {
            code: function (this: Activity, params) {
                this.ctx.count += 100;
                console.log("this.ctx.count:", this.ctx.count);
            }
        }
    }),
    toVariable: "sb",
    context: {
        count: 100
    },
    options: {
        code: function (this: Activity, params) {
            console.log("this.$ctx.count:", this.ctx.count);
            return params.$ctx.count + 200
        }
    },
});


const jsonObject = converter.toJSON(config as any);

console.log("jsonObject:", jsonObject);

const configObject = converter.toObject(jsonObject);

console.log("configObject:", configObject);

const act = createActivity(configObject);


act.run().then(res => console.log("res:", res))