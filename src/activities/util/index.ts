import { IActivityExecuteParams, IActivityRunParams } from "../../types/activity";

export function createTaskRunDefaultParams(): IActivityRunParams {
    return {
        $preRes: undefined,
        $extra: {},
    }
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
        $a: {}
    }
}