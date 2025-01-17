import { createActivityHOC } from "../activityFactory";
import GlobalBuiltinContext from "../globalBuiltinContext";
import Messenger from "../messenger";
import { ActivityType, IActivityConfig } from "../types/activity";
import { ICreateInstanceOptions } from "../types/factory";

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

