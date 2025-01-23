import Activity from "../activities/Activity";
import { ILogger } from "../types/logger";
import { IMessenger } from "../types/messenger";
import { addReadyOnlyProperty } from "../util";

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

    /**
     * 日志
     */
    // @ts-ignore
    public accessor logger: ILogger;
    // @ts-ignore
    public accessor messenger: IMessenger;

    getObject() {
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

    getMethods() {
        return {
            addVariable: this.addVariable,
            removeVariable: this.removeVariable,
            addMethod: this.addMethod,
            removeMethod: this.removeMethod,
            addConstant: this.addConstant,
            removeConstant: this.removeConstant,
            addActivityReference: this.addActivityReference,
            removeActivityReference: this.removeActivityReference,
        };
    }

    addVariable = (name: string, value: any) => {
        this.#$v[name] = value;
    };

    removeVariable = (name: string) => {
        delete this.#$v[name]
    };

    addMethod = (name: string, value: Function) => {
        addReadyOnlyProperty(this.#$m, name, value);
    };

    removeMethod = (name: string) => {
        delete this.#$m[name];
    };

    addConstant = (name: string, value: any) => {
        addReadyOnlyProperty(this.#$c, name, value);
    };

    removeConstant = (name: string) => {
        delete this.#$c[name];
    };

    addActivityReference = (name: string, activity: Activity) => {
        addReadyOnlyProperty(this.#$a, name, activity);
    };

    removeActivityReference = (name: string) => {
        delete this.#$a[name];
    };

    clearConstants = () => {
        this.#$c = {}
    }

    clearMethods = () => {
        this.#$m = {}
    }

    clearVariable = () => {
        this.#$v = {};
    }

    clearActivityReference = () => {
        this.#$a = {}
    }

    clear = () => {
        this.clearConstants();
        this.clearVariable();
        this.clearMethods();
        this.clearActivityReference()
    }
}


export default GlobalBuiltinContext;
