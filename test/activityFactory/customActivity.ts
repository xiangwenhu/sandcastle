import { isFunction } from "lodash";
import CodeActivity from "../../src/activities/Code";

import {
    $, 
    IActivityExecuteParams,
    IActivityTaskFunction,
    createActivity,
    register
} from "../../src";

export interface CodeActivityOptions {
    code: string | IActivityTaskFunction;
}

interface CodeActivityContext {
    count: number;
}

interface EE {
    $tt: string;
}

export default class CCodeActivity<C = any, R = any> extends CodeActivity<
    C,
    R
> {
    buildTask() {
        const { code } = this.options;
        if (isFunction(code)) {
            return (paramObject: IActivityExecuteParams) => {
                return code.call(null, paramObject);

            }
        }
        return super.buildWithCode(code);
    }
}

register("ccode", CCodeActivity);

const ccode = $.$HOC<CodeActivityContext, CodeActivityOptions>("ccode");

const activityProps = ccode({
    type: "ccode",
    name: "如果ctx.count小于5,加加",
    before: $.code({
        name: "",
        options: {
            code(param) {
                param.$$.ccc = 1000;
            }
        }
    }),
    toVariable: "sb",
    context: {
        count: 100
    },
    options: {
        // code:    "console.log('$tt', $$.$tt, $$.ccc);",
        code(params) {
            console.log(params.$ctx.count)
        }
    },
});

const activity = createActivity(activityProps);

activity.run();
