import _ from "lodash";
import Activity from "../activities/Activity";
import { ILogger } from "../types/logger";
import { IMessenger } from "../types/messenger";

class GlobalBuiltinContext {
    public terminated: boolean = false;

    public terminatedMessage: string | undefined = undefined;

    /**
     * 方法
     */
    #$m: Record<string, Function> = {};
    /**
     * 常量, 不允许修改
     */
    #$c: Record<string, any> = {};
    /**
     * 变量
     */
    #$v: Record<string, any> = {};

    /**
     * 活动引用
     */
    #$a: Record<string, Activity> = {};

    get $v(){
        return this.#$v;
    }

    /**
     * 日志
     */
    // @ts-ignore
    public accessor logger: ILogger;
    // @ts-ignore
    public accessor messenger: IMessenger;

    toObject() {
        const self = this;
        return {
            get $m() {
                return self.#$m;
            },
            get $v() {
                return self.#$v;
            },
            get $c() {
                return self.#$c;
            },
            get $a() {
                return self.#$a;
            },
        };
    }

    registerVariable(name: string, value: any) {
        _.merge(this.#$v, {
            [name]: value,
        });
    }

    registerMethod(name: string, value: Function) {
        _.merge(this.#$m, {
            [name]: value,
        });
    }

    registerConstant(name: string, value: any) {
        Object.defineProperty(this.#$c, name, {
            configurable: false,
            get() {
                return value;
            },
        });
    }

    registerActivityReference(name: string, activity: Activity) {
        _.merge(this.#$a, {
            [name]: activity,
        });
    }
    
}

export default GlobalBuiltinContext;
