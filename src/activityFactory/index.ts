import { register, create, createChildren } from "./factory";

import codeActivityFactory from "./code";
import delayActivityFactory from "./delay";
import sequenceActivityFactory from "./sequence";
import allActivityFactory from "./all";
import raceActivityFactory from "./race";

const factory = {
    create,
    createChildren
}

register("code", codeActivityFactory(factory));
register("delay", delayActivityFactory(factory));
register("sequence", sequenceActivityFactory(factory));
register("all", allActivityFactory(factory));
register("race", raceActivityFactory(factory))


export default factory;

