
export interface BuiltInProperties<T = any> {
    placeholder?: string;
    properties: { [key: string]: T }
}

export type BuiltInMethods = BuiltInProperties<Function>;


export interface GlobalBuiltInObject {
    properties: BuiltInProperties,
    methods: BuiltInMethods
}