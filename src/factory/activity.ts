import { ExtendParams, IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import GlobalBuiltInObjectClass from "./builtIn";
import { GLOBAL_BUILTIN, GLOBAL_MESSENGER, GLOBAL_VARIABLES } from "../const";
import Activity from "../activities/Activity";
import { GlobalBuiltInObject } from "../types/factory";
import Messenger from "../messenger";
import { ActivityType } from "../types/activityConfig";
export * from "./builtIn";

const createActivityHOC =
    (builtIn: GlobalBuiltInObject) =>
    <C, R, O, ER extends ExtendParams, EE extends ExtendParams>(
        activityConfig: IActivityConfig,
        globalContext: Record<PropertyKey, any> = {}
    ) => {
        globalContext[GLOBAL_BUILTIN] = builtIn;
        globalContext[GLOBAL_VARIABLES] = {};
        globalContext[GLOBAL_MESSENGER] = new Messenger();
        const activity = factory.create(
            activityConfig,
            globalContext
        ) as any as Activity<C, R, O, ER, EE>;
        return activity;
    };

export function createInstance() {
    const builtIn = new GlobalBuiltInObjectClass();
    const createActivity = createActivityHOC(builtIn.getBuiltIn());
    return {
        builtIn,
        createActivity,
        create<T>(
            type: ActivityType,
            activityConfig: IActivityConfig,
            globalContext: Record<PropertyKey, any> = {}
        ) {
            activityConfig.type = type;
            return createActivity(activityConfig, globalContext);
        },
    };
}

const instance = createInstance();

export const batchRegisterMethods = instance.builtIn.batchRegisterMethods.bind(
    instance.builtIn
);
export const batchRegisterVariables =
    instance.builtIn.batchRegisterVariables.bind(instance.builtIn);
export const registerMethod = instance.builtIn.registerMethod.bind(
    instance.builtIn
);
export const registerVariable = instance.builtIn.registerVariable.bind(
    instance.builtIn
);
export const createActivity = instance.createActivity;
