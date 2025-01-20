import { isFunction, isObjectLike, isPlainObject, isString } from 'lodash';
import { IActivityConfig } from '../types/activity';
import { isAsyncFunction, isNormalFunction } from './function';


/**
 * 1. toJSON   JSON.stringify 产生特定格式自付出啊，  "__$$__function__$$__,函数字符串'
 * 2. toObject JSON.parse  解析 特殊对象，返回函数
 */

const $$FuncPlaceholder = "__$$__function__$$__";
const PropertyWhitelist = [
    "code",
    // waitForResponse
    "urlOrPredicate",
    "predicate",
    // page.$ , page.$$
    "pageFunction"
];


interface Options {
    /**
     * function 转为字符串时的占位符
     */
    funcPlaceholder: string;
    /**
     * 检测的属性白名单
     */
    propertyWhitelist: string[]
}

const DefaultOptions: Options = {
    funcPlaceholder: $$FuncPlaceholder,
    propertyWhitelist: PropertyWhitelist
}


export class ObjectJSONConverter {

    constructor(private options: Options = DefaultOptions) {

    }

    /**
     *  配置对象转为JSON对象，比如传递给后台服务
     * @param config 
     * @returns 
     */
    toJSON(config: IActivityConfig) {
        const opt = this.options;
        return JSON.stringify(config, (key: string, value: any) => {
            if (opt.propertyWhitelist.includes(key)) {
                let funStr: string = value.toString();
                // 异步方法
                if (isAsyncFunction(value)) {
                    // async method(){} 转为  async function method(){}
                    if (!funStr.startsWith("async function")) {
                        funStr = funStr.replace(/^(async)/, "async function")
                    }
                    return `${opt.funcPlaceholder},${funStr}`
                }

                // 普通方法
                if (isNormalFunction(value)) {
                    //  method(){} 转为 function method(){}
                    if (!funStr.startsWith("function")) {
                        funStr = `function ${funStr}`
                    }
                    return `${opt.funcPlaceholder},${funStr}`
                }
            }
            return value;
        }, "\t")
    }

    /**
     * JSON转为对象，比如 createActivity创建实例，然后run
     * @param configStr 
     * @returns 
     */
    toObject(configStr: string) {
        const opt = this.options;
        return JSON.parse(configStr, (key: string, value: any) => {
            if (opt.propertyWhitelist.includes(key) && isString(value) && value.startsWith(`${opt.funcPlaceholder},`)) {
                const funStr = value.slice(opt.funcPlaceholder.length + 1);
                // TODO:: 识别类型，调用各自的构造函数动态构造
                return eval(`(${funStr})`)
            }
            return value;
        })
    }

}


// export default new ObjectJSONConverter()