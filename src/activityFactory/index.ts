import { register, create, createChildren } from "./factory";

import codeActivityFactory from "./code";
import delayActivityFactory from "./delay";
import sequenceActivityFactory from "./sequence";
import allActivityFactory from "./all";
import raceActivityFactory from "./race";
import assertActivityFactory from "./assert";
import whileActivityFactory from "./while";

const factory = {
    create,
    createChildren
}

register("code", codeActivityFactory(factory));
register("delay", delayActivityFactory(factory));
register("sequence", sequenceActivityFactory(factory));
register("all", allActivityFactory(factory));
register("race", raceActivityFactory(factory));
register("assert", assertActivityFactory(factory));
register("while", whileActivityFactory(factory))


export default factory;

