import { GlobalBuiltInObject } from "../types/factory";
import _ from 'lodash';

const builtInObject: GlobalBuiltInObject = {
    properties: {
        placeholder: "$v",
        properties: {}
    },
    methods: {
        placeholder: "$m",
        properties: {}
    }
}

export function getBuiltIn() {
    return builtInObject;
}

export function batchRegisterVariables(properties: Record<string, any>) {
    _.merge(builtInObject.properties.properties, properties)
}


export function batchRegisterMethods(methods: Record<string, Function>) {
    _.merge(builtInObject.methods.properties, methods)
}

export function registerVariable(name: string, value: any) {
    _.merge(builtInObject.properties.properties, {
        [name]: value
    })
}


export function registerMethod(name: string, value: Function) {
    _.merge(builtInObject.methods.properties, {
        [name]: value
    })
}