import { CodeActivity } from "../activities/CodeActivity"
import { IActivityProps } from "./types";

export interface ICodeActivityProps extends IActivityProps {
    code: string;
}

export default function (props: ICodeActivityProps) {
    //Activity的构造函数
    const activity = new CodeActivity(props.context, props.code)
    activity.name = props.name || activity.name
    activity.build(props.code)
    return activity
}