import { register as _register, create, createChildren } from "./factory";

import codeActivityFactory from "./code";
import delayActivityFactory from "./delay";
import sequenceActivityFactory from "./sequence";
import parallelActivityFactory from "./parallel";
import raceActivityFactory from "./race";
import assertActivityFactory from "./assert";
import whileActivityFactory from "./while";
import assertSequenceActivityFactory from "./assertSequence"
import ifElseActivityFactory from "./ifElse";
import requestActivityFactory from "./request";
import breakActivityFactory from "./break";
import terminateActivityFactory from "./terminate";
import tryCatchActivityFactory from "./tryCatch";
import Activity from "../activities/Activity";
import { ActivityFactoryFactory } from "../types/activity";

const factory = {
    create,
    createChildren
}

function register(type: string, func: (factory: ActivityFactoryFactory) => (...args: any) => Activity<any, any>) {
    _register(type, func(factory));
}

register("code", codeActivityFactory);
register("delay", delayActivityFactory);
register("sequence", sequenceActivityFactory);
register("parallel", parallelActivityFactory);
register("race", raceActivityFactory);
register("assert", assertActivityFactory);
register("while", whileActivityFactory);
register("assertSequence", assertSequenceActivityFactory);
register("ifElse", ifElseActivityFactory);
register("request", requestActivityFactory);
register("break", breakActivityFactory);
register("terminate", terminateActivityFactory);
register("tryCatch", tryCatchActivityFactory);


export default factory;

export {
    register
}