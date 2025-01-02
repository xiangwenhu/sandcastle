import _ from "lodash";

export function firstToLower(str: string) {
    const s = String(str);
    if (s.length === 0) {
        return "";
    }
    return s[0].toLowerCase() + s.slice(1);
}

export function extractOwnOtherKeys(obj: Record<PropertyKey, any>, keys: PropertyKey[]): PropertyKey[] {
    const keysList = Reflect.ownKeys(obj);
    return _.difference(keysList, keys) as string[]
}

export function addReadyOnlyProperty(obj: Object, property: string, value: any) {
    Object.defineProperty(obj, property, {
        configurable: false,
        get() {
            return value;
        },
    });
}