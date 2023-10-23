import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import axios, { AxiosRequestConfig } from "axios";

export type RequestActivityOptions = AxiosRequestConfig;

export default class RequestActivity<C = any, R = any> extends Activity<C, R, RequestActivityOptions> {
    buildTask() {
        return (paramObj: IActivityRunParams) => {
            const cg = this.replaceVariable<AxiosRequestConfig>(
                this.options,
                paramObj
            );
            return axios(cg);
        };
    }
}
