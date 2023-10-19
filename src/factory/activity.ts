import { IActivityProps } from "../types/activity";
import factory from "../crawlActivityFactory";
import { getBuiltIn } from "./builtIn";
import { GLOBAL_BUILTIN } from "../const";
export * from "./builtIn"


export default function createActivity(activityProps: IActivityProps, globalContext: any = {}) {
    globalContext[GLOBAL_BUILTIN] = getBuiltIn();
    const activity = factory.create(activityProps, globalContext);
    return activity;
}
