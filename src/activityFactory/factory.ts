import ContainerActivity from "../activities/ContainerActivity";
import { ActivityFactory, BaseActivityType, IActivityProps } from "../types/activity";
const factoryMap = new Map<string, ActivityFactory>();

export function register(type: BaseActivityType, factory: ActivityFactory) {
    factoryMap.set(type, factory)
}

export function create(props: IActivityProps, globalContext: any = {}) {
    return createSingle(props, globalContext);
}

export function createChildren(props: IActivityProps[], globalContext: any = {}) {
    return props.map(p => createSingle(p, globalContext))
}

function createSingle(props: IActivityProps, globalContext: any = {}) {
    const type = props.type;
    const factory: ActivityFactory | undefined = factoryMap.get(type);
    if (!factory) {
        throw new Error(`不存在type为 ${type} 的factory`)
    }
    const activity = factory(props, globalContext);
    if (Array.isArray(props.children)) {
        (activity as ContainerActivity).children = createChildren(props.children, globalContext);
    }
    return activity;
}