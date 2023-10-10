import { register, create, createChildren } from "./factory";

import codeActivityFactory from "./code";
import delayActivityFactory from "./delay";
import sequenceActivityFactory from "./sequence";
import { IActivityProps } from "./types";

const factory = {
    create,
    createChildren
}

register("code", codeActivityFactory(factory));
register("delay", delayActivityFactory(factory));
register("sequence", sequenceActivityFactory(factory));

export default function createActivity(activityProps: IActivityProps, globalContext: any = {}) {
    const activity = factory.create(activityProps, globalContext);
    return activity;
}
