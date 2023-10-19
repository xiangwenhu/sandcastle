import { IActivityRunParams } from "../../types/activity";

export function createTaskRunDefaultParams(): IActivityRunParams{
    return {
        ctx: {},
        preRes: undefined,
        extra: {}
    }
}