import _ from "lodash";
import { ActivityError } from "../../ActivityError";
import {
    IActivityExecuteParams,
    IActivityRunParams,
} from "../../types/activity";
import Activity from "../Activity";

export function createTaskRunDefaultParams(): IActivityRunParams {
    return {
        $preRes: undefined,
        $extra: {},
        $$: {}
    };
}

export function createTaskExecuteDefaultParams(): IActivityExecuteParams {
    const tp = createTaskRunDefaultParams();
    return {
        ...tp,
        $gCtx: {},
        $c: {},
        $m: {},
        $v: {},
        $ctx: {},
        $parent: undefined,
        $res: undefined,
        $a: {},
    };
}

const ACTIVITY_ERROR_NAME = ["activityError", "terminateError"];
export function createActivityError(
    this: Activity<any, any, any>,
    err: any,
    activity?: Activity<any, any, any>
) {
    const act = activity || this;
    if (_.isString(err)) {
        return new ActivityError(err, act);
    } else if (_.isObject(err)) {
        // const name = (err as Record<string, any>)?.name;
        // if (ACTIVITY_ERROR_NAME.includes(name)) {
        //     return err;
        // }
        if (err instanceof ActivityError) {
            return err;
        }
        if (_.has(err, "message")) {
            return new ActivityError(`${_.get(err, "message")}`, act);
        }
    }
    return new ActivityError("未知异常", act);
}
