import { IActivityRunParams } from "../types/activity";
import Activity from "./Activity";
import axios, { AxiosRequestConfig } from "axios";

export default class RequestActivity<C = any, R = any> extends Activity<C, R> {
    constructor(context: C = {} as C, protected config: AxiosRequestConfig) {
        super(context);
    }

    buildTask(config: AxiosRequestConfig) {
        this.config = config || this.config;
        return (paramObj: IActivityRunParams) => {
            const cg = this.replaceVariable<AxiosRequestConfig>(this.config, paramObj);
            return axios(cg)
        }
    }
}

