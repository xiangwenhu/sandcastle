import Activity from "../activities/Activity";
import ContainerActivity from "../activities/ContainerActivity";

export type IActivityProps<C = any>  = {
    type: string;
    context?: C,
    name?: string;
    children?: IActivityProps[]
} & Record<string, any>

export interface ActivityFactory<P extends IActivityProps = any, A extends Activity = Activity | ContainerActivity> {
    (props: P, globalContext?: any): A,
}

export interface ActivityChildrenFactory<P extends IActivityProps = any, A extends Activity = any> {
    (props: P[], globalContext?: any): A[],
}

export interface ActivityFactoryFactory<P extends IActivityProps = any> {
    create: ActivityFactory<P>;
    createChildren: ActivityChildrenFactory<P>;
}