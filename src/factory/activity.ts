import { ActivityType, ExtendParams, IActivityConfig } from "../types/activity";
import Activity from "../activities/Activity";
import Messenger from "../messenger";
import GlobalBuiltinContext from "../globalBuiltinContext";
import { ICreateInstanceOptions } from "../types/factory";
import { GLOBAL_BUILTIN_CONTEXT } from "../const";
import { factory } from "../activityFactory";

const createActivityHOC =
    (globalBuiltinContext: GlobalBuiltinContext) =>
    <C, R, O>(
        activityConfig: IActivityConfig,
        globalContext: Record<PropertyKey, any> = {}
    ) => {
        Object.defineProperty(globalContext, GLOBAL_BUILTIN_CONTEXT, {
            configurable: false,
            get() {
                return globalBuiltinContext;
            },
        });

        const activity = factory.create(
            activityConfig,
            globalContext
        ) as any as Activity<C, R, O>;
        return activity;
    };

export function createInstance(options: ICreateInstanceOptions = {}) {
    const gBCtx = new GlobalBuiltinContext();
    gBCtx.logger = options.logger || console;
    gBCtx.messenger = options.messenger || new Messenger();
    const createActivity = createActivityHOC(gBCtx);

    return {
        ...gBCtx.getMethods(),
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

export const createActivity = instance.createActivity;
export const create = instance.create;

export const addConstant = instance.addConstant;
export const addMethod = instance.addMethod;
export const addVariable = instance.addVariable;
export const addActivityReference = instance.addActivityReference;

export const removeConstant = instance.removeConstant;
export const removeMethod = instance.removeMethod;
export const removeVariable = instance.removeVariable;
export const removeActivityReference = instance.removeActivityReference;
