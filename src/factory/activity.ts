import { ActivityType, ExtendParams, IActivityConfig } from "../types/activity";
import factory from "../crawlActivityFactory";
import Activity from "../activities/Activity";
import Messenger from "../messenger";
import GlobalBuiltinContext from "../globalBuiltinContext";
import { ICreateInstanceOptions } from "../types/factory";
import { GLOBAL_BUILTIN_CONTEXT } from "../const";

const createActivityHOC =
    (globalBuiltinContext: GlobalBuiltinContext) =>
    <C, R, O, ER extends ExtendParams, EE extends ExtendParams>(
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
        ) as any as Activity<C, R, O, ER, EE>;
        return activity;
    };

export function createInstance(options: ICreateInstanceOptions = {}) {
    const gBCtx = new GlobalBuiltinContext();
    gBCtx.logger = options.logger || console;
    gBCtx.messenger = options.messenger || new Messenger();
    const createActivity = createActivityHOC(gBCtx);

    const registerConstant = gBCtx.registerConstant.bind(gBCtx);
    const registerMethod = gBCtx.registerMethod.bind(gBCtx);

    return {
        registerConstant,
        registerMethod,
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
export const registerConstant = instance.registerConstant;
export const registerMethod = instance.registerMethod;
export const create = instance.create;
