import { IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import { getBuiltIn } from "./builtIn";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
export * from "./builtIn"


export default function createActivity(activityProps: IActivityConfig, globalContext: any = {}) {
    globalContext[GLOBAL_BUILTIN] = getBuiltIn();
    globalContext[GLOBAL_VARIABLES] = {};
    const activity = factory.create(activityProps, globalContext);
    return activity;
}
