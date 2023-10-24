import { ExtendParams, IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import GlobalBuiltInObjectClass from "./builtIn";
import { GLOBAL_BUILTIN, GLOBAL_VARIABLES } from "../const";
import Activity from "../activities/Activity";
import { GlobalBuiltInObject } from "../types/factory";
export * from "./builtIn";

const createActivity =
    (builtIn: GlobalBuiltInObject) =>
    <C, R, O, ER extends ExtendParams, EE extends ExtendParams>(
        activityProps: IActivityConfig,
        globalContext: any = {}
    ) => {
        globalContext[GLOBAL_BUILTIN] = builtIn;
        globalContext[GLOBAL_VARIABLES] = {};
        const activity = factory.create(
            activityProps,
            globalContext
        ) as any as Activity<C, R, O, ER, EE>;
        return activity;
    };

export default function createInstance() {
    const builtIn = new GlobalBuiltInObjectClass();
    const factory = createActivity(builtIn.getBuiltIn());
    return {
        builtIn,
        createActivity: factory,
    };
}


const ins = createInstance();

console.log("ins:", ins);
