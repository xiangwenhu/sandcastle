import { GlobalBuiltInObject } from "../types/factory";
import _ from "lodash";

export default class GlobalBuiltInObjectClass {
    #builtInObject: GlobalBuiltInObject = {
        properties: {
            placeholder: "$c",
            properties: {},
        },
        methods: {
            placeholder: "$m",
            properties: {},
        },
        activities: {
            placeholder: "$a",
            properties: {},
        },
    };

    getBuiltIn() {
        return this.#builtInObject;
    }

    batchRegisterVariables(properties: Record<string, any>) {
        _.merge(this.#builtInObject.properties.properties, properties);
    }

    batchRegisterMethods(methods: Record<string, Function>) {
        _.merge(this.#builtInObject.methods.properties, methods);
    }

    registerVariable(name: string, value: any) {
        _.merge(this.#builtInObject.properties.properties, {
            [name]: value,
        });
    }

    registerMethod(name: string, value: Function) {
        _.merge(this.#builtInObject.methods.properties, {
            [name]: value,
        });
    }
}
