import axios, { AxiosRequestConfig } from "axios";
import { IActivityExecuteParams } from "../types/activity";
import Activity from "./Activity";
import { registerActivity } from "../activityFactory/factory";

export type RequestActivityOptions = AxiosRequestConfig;

@registerActivity()
export default class RequestActivity<C = any, R = any> extends Activity<C, R, RequestActivityOptions> {
    buildTask() {
        return (paramObj: IActivityExecuteParams) => {
            const cg = this.getReplacedOptions(
                paramObj
            );
            return axios(cg);
        };
    }
}
