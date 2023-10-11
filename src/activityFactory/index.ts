import { register, create, createChildren } from "./factory";

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

const factory = {
    create,
    createChildren
}

register("code", codeActivityFactory(factory));
register("delay", delayActivityFactory(factory));
register("sequence", sequenceActivityFactory(factory));
register("parallel", parallelActivityFactory(factory));
register("race", raceActivityFactory(factory));
register("assert", assertActivityFactory(factory));
register("while", whileActivityFactory(factory));
register("assertSequence", assertSequenceActivityFactory(factory));
register("ifElse", ifElseActivityFactory(factory));
register("request", requestActivityFactory(factory));
register("break", breakActivityFactory(factory));
register("terminate", terminateActivityFactory(factory))


export default factory;

