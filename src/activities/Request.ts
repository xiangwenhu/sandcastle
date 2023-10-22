import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import axios, { AxiosRequestConfig } from "axios";

export default class RequestActivity<C = any, R = any> extends Activity<C, R> {
    buildTask(options: AxiosRequestConfig) {
        this.taskOptions = options;
        return (paramObj: IActivityRunParams) => {
            const cg = this.replaceVariable<AxiosRequestConfig>(this.taskOptions, paramObj);
            return axios(cg)
        }
    }
}

