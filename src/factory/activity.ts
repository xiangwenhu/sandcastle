import { ExtendParams, IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import GlobalBuiltInObjectClass from "./builtIn";
import { GLOBAL_BUILTIN, GLOBAL_MESSENGER, GLOBAL_VARIABLES } from "../const";
import Activity from "../activities/Activity";
import { GlobalBuiltInObject } from "../types/factory";
import Messenger from "../messenger";
export * from "./builtIn";

const createActivityHOC =
    (builtIn: GlobalBuiltInObject) =>
        <C, R, O, ER extends ExtendParams, EE extends ExtendParams>(
            activityProps: IActivityConfig,
            globalContext: Record<PropertyKey, any> = {}
        ) => {
            globalContext[GLOBAL_BUILTIN] = builtIn;
            globalContext[GLOBAL_VARIABLES] = {};
            globalContext[GLOBAL_MESSENGER] = new Messenger();
            const activity = factory.create(
                activityProps,
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
    };
}

const instance = createInstance();

export const batchRegisterMethods = instance.builtIn.batchRegisterMethods.bind(instance.builtIn);
export const batchRegisterVariables = instance.builtIn.batchRegisterVariables.bind(instance.builtIn);
export const registerMethod = instance.builtIn.registerMethod.bind(instance.builtIn);
export const registerVariable = instance.builtIn.registerVariable.bind(instance.builtIn);
export const createActivity = instance.createActivity;

