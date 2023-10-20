import { isString } from "lodash";
import Activity from "../activities/Assert"
import { ActivityFactoryFactory, IActivityProps } from "../types/activity";
import factory from ".";

export interface IAssertActivityProps<C = any> extends IActivityProps<C> {
    code: string;
}

export default (_factory: ActivityFactoryFactory) =>
    <C = any, GC = any>(props: IAssertActivityProps<C>, globalContext: GC) => {
        const code = props.code;
        let children: Activity[] = [];
        if (isString(code)) {
            const act = factory.create({
                type: "code",
                name: "assert",
                code: `return (${code})`
            }, globalContext) as Activity;
            children = [act]
        } else if (Array.isArray(props.children)) {
            children = factory.createChildren(props.children, globalContext) as Activity[]
        } else {
            throw new Error('AssertActivity必须有code或者children');
        }

        const activity = new Activity(props.context, children);
        activity.globalCtx = globalContext || {};
        activity.name = props.name || activity.name;
        activity.build();
        return activity
    }