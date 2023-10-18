import axios, { AxiosRequestConfig } from "axios";
import fs from "fs";
import _ from "lodash";
import { ensureDir } from "./fs";

function downloadFile(url: string, dist: string, config: AxiosRequestConfig = {}, timeout = 20 * 1000) {
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(dist, {
            encoding: "utf-8",
            autoClose: true,
            emitClose: true,
        });
        const ticket = setTimeout(() => {
            writer.close();
            reject(new Error(`下载 ${url} 超时`))
        }, timeout);
        axios({
            ...config,
            method: 'get',
            url: url,
            responseType: 'stream',
        }).then(function (res) {
            const data = { url, dist }
            const onFinish = (data: any) => {
                clearTimeout(ticket);
                resolve(data)
            }
            writer.on("finish", () => onFinish(data));
            writer.on("close", () => onFinish(data));
            writer.on("error", reject);
            res.data.pipe(writer);
        }).catch(err => {
            clearTimeout(ticket)
            reject(err);
        })
    })
}


const DEFAULT_OPTIONS = {
    retryCount: 1,
    requestConfig: {},
    timeout: 30 * 1000
}

export async function downloadFileWithRetry(url: string, dist: string, options: {
    retryCount: number,
    requestConfig: AxiosRequestConfig,
    timeout: number
} = DEFAULT_OPTIONS) {
    await ensureDir(dist)
    return downloadFile(url, dist, _.merge({}, options.requestConfig), options.timeout)

}
