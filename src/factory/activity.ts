import { ExtendParams, IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import { getBuiltIn } from "./builtIn";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
import Activity from "../activities/Activity";
export * from "./builtIn"


export default function createActivity<C,R, O, ER extends ExtendParams, EE extends ExtendParams>(activityProps: IActivityConfig, globalContext: any = {}) {
    globalContext[GLOBAL_BUILTIN] = getBuiltIn();
    globalContext[GLOBAL_VARIABLES] = {};
    const activity = factory.create(activityProps, globalContext) as any as Activity<C,R, O, ER, EE>;
    return activity;
}
