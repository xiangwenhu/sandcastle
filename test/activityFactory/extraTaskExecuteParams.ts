import {
    IActivityConfig,
    IActivityExecuteParams,
    IActivityTaskFunction,
} from "../../src/types/activity";
import { isBoolean, isFunction, isString } from "lodash";
import Activity from "../../src/activities/Activity";
import { EnumActivityStatus } from "../../src/enum";
import { createOneParamAsyncFunction } from "../../src/factory/function";
import { ActivityError } from "../../src/ActivityError";
import { register } from "../../src/activityFactory";

import createInstance from "../../src/factory/activity";
const { createActivity } = createInstance();

export interface CodeActivityOptions {
    code: string;
}

interface EE {
    $tt: string;
}

export default class CCodeActivity<C = any, R = any> extends Activity<
    C,
    R,
    CodeActivityOptions,
    {},
    EE
> {
    buildTask() {
        const { code } = this.options;
        if (isFunction(code)) {
            return (paramObject: IActivityExecuteParams<{}, EE>) =>
                code.call(null, paramObject);
        }
        return this.buildWithCode(code);
    }

    getExtraExecuteParamsNames(): [keyof EE] {
        return ["$tt"];
    }

    override getExtraExecuteParams(): EE {
        return {
            $tt: "哈哈",
        };
    }

    /**
     *
     * @param {代码} code
     */
    buildWithCode(code: string): IActivityTaskFunction<{}, EE> {
        if (!isString(code) && !isBoolean(code)) {
            throw new ActivityError(
                "buildWithCode方法的code参数必须是字符串",
                this
            );
        }
        this.status = EnumActivityStatus.BUILDING;
        const g = this.globalBuiltObject;
        const $c = g.properties.placeholder || "$c";
        const $m = g.methods.placeholder || "$m";

        const names = this.getExtraExecuteParamsNames();

        this.task = createOneParamAsyncFunction(code, [
            "$gCtx", // 全局上下文
            "$ctx", // 上下文
            $c, // 内置变量
            $m, // 内置方法
            "$v",
            "$parent", // 父节点
            "$preRes", // 上一个活动的返回值
            "$res", // 本活动执行完毕的返回值
            "$extra", // 额外的参数
            "$item",
            "$index",
            "$a",
            ...names,
        ]) as IActivityTaskFunction;
        this.status = EnumActivityStatus.BUILDED;
        return this.task;
    }
}

register("ccode", CCodeActivity);

const activityProps: IActivityConfig = {
    type: "ccode",
    name: "如果ctx.count小于5,加加",
    toVariable: "sb",
    context: {
        count: 100,
    },
    options: {
        code: "console.log('$tt', $tt);",
    },
};

const activity = createActivity(activityProps);

activity.run();
