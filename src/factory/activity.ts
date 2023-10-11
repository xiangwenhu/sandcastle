import { IActivityProps } from "../types/activity";
import factory from "../activityFactory";

export default function createActivity(activityProps: IActivityProps, globalContext: any = {}) {
    const activity = factory.create(activityProps, globalContext);
    return activity;
}
