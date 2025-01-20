import { isFunction, isObject } from "lodash";
import Activity from "../activities/Activity";
import { createActivity } from "../activityFactory";
import GlobalBuiltinContext from "../globalBuiltinContext";
import { IActivityConfig, IActivityRunParams } from "../types/activity";
import { ICreateInstanceOptions } from "../types/factory";
import _ from "lodash";


export type ActivityFactoryOptions = {
    /**
     * 全局上下文
     */
    globalContext?: Record<PropertyKey, any>;
    /**
     * 变量
     */
    variables?: Record<string, any>,
    /**
     * 方法
     */
    methods?: Record<string, Function>,
    /**
     * 常量
     */
    consts?: Record<string, any>,

} & ICreateInstanceOptions;


enum ExecuteStatus {
    /**
     未初始化
    */
    UNINITIALIZED = 0,
    /**
     * 初始化
     */
    INITIALIZED = 1,
    /**
     * 准备中
     */
    PREPARE = 2,
    /**
     * 执行中
     */
    EXECUTING = 4,
    /**
     * 执行完毕
     */
    EXECUTED = 5,
}


interface BuiltInItems {
    readonly $m: Record<string, Function>;
    readonly $v: Record<string, any>;
    readonly $c: Record<string, any>;
    readonly $a: Record<string, Activity<any, any, any>>;
}

export class ActivityIntance {
    private status: ExecuteStatus = ExecuteStatus.UNINITIALIZED;
    private gBCtx!: GlobalBuiltinContext;
    public activity: Activity | undefined;


    constructor(private config: IActivityConfig, private options: ActivityFactoryOptions = {}) {
        this.reset();
        this.setBuiltInItems({
            $a: {},
            $c: this.options.consts || {},
            $m: this.options.methods || {},
            $v: this.options.variables || {}
        }, true)
        this.status = ExecuteStatus.INITIALIZED;
    }

    private batchAdd(keyValus: Record<string, any>, type: "Constant" | "Method" | "Variable") {
        const property = `add${type}`;
        // @ts-ignore
        const method: Function = this.gBCtx[property]

        if (!(property in this.gBCtx) || !isFunction(method)) return;
        for (let [key, value] of Object.entries(keyValus)) {
            method.call(this.gBCtx, key, value)
        }
    }

    private batchRemove(keyValus: string[], type: "Constant" | "Method" | "Variable") {
        const property = `remove${type}`;
        // @ts-ignore
        const method: Function = this.gBCtx[property]

        if (!(property in this.gBCtx) || !isFunction(method)) return;
        for (let [key, value] of Object.entries(keyValus)) {
            method.call(this.gBCtx, key, value)
        }
    }

    private reset() {
        const { options, config } = this;
        this.activity = createActivity({
            messenger: options.messenger,
            logger: options.logger,
            config,
            // 使用浅备份，因为 globalContext上会注册只读的内置属性，防止重复注册
            globalContext: options.globalContext
        });


        // 如果已经存在，不是第一次执行
        if (this.gBCtx) {
            let builtInItems: BuiltInItems = _.cloneDeep(this.gBCtx.getObject());
            this.gBCtx = this.activity.globalBuiltInCtx;
            this.setBuiltInItems(builtInItems, true);

        } else {

            this.gBCtx = this.activity.globalBuiltInCtx;
        }
        this.status = ExecuteStatus.UNINITIALIZED;
    }


    addVariables(variables: Record<string, any>) {
        this.batchAdd(variables, "Variable")
    }


    addConstants(consts: Record<string, any>) {
        this.batchAdd(consts, "Constant")
    }

    addMethods(methods: Record<string, any>) {
        this.batchAdd(methods, "Method")
    }

    removeVariables(variableNames: string[]) {
        this.batchRemove(variableNames, "Variable")
    }


    removeConstants(constNames: string[]) {
        this.batchRemove(constNames, "Constant")
    }

    removeMethods(methodNames: string[]) {
        this.batchRemove(methodNames, "Method")
    }


    private setBuiltInItems(builtInItems: BuiltInItems, clearBeforeAdd: boolean = false) {
        if (clearBeforeAdd) {
            this.gBCtx.clear();
        }
        const { $c, $m, $v } = builtInItems;
        if (Object.keys($c).length > 0) {
            this.batchAdd($c, "Constant")
        }
        if (Object.keys($m).length > 0) {
            this.batchAdd($m, "Method")
        }
        if (Object.keys($v).length > 0) {
            this.batchAdd($c, "Variable")
        }
    }

    async run(paramsObject?: IActivityRunParams) {
        if (this.status === ExecuteStatus.EXECUTING) return console.warn(`${this.activity?.name} 正在执行中`);

        if (!this.gBCtx) throw new Error("活动内置上下文异常");
        // 备份执行前的内置环境：变量，常量，方法
        let builtInItems: BuiltInItems = _.cloneDeep(this.gBCtx.getObject());
        try {
            if (this.status === ExecuteStatus.EXECUTED) {
                this.reset();
            }
            this.status = ExecuteStatus.EXECUTING;
            const res = await this.activity?.run(paramsObject);
            return res;
        }
        catch (err) {
            throw err
        } finally {
            this.status = ExecuteStatus.EXECUTED
            // 复原到执行前：变量，常量，方法， 因为执行过程可能会添加，但是没有释放
            this.setBuiltInItems(builtInItems, true)
        }
    }


    get messenger() {
        return this.gBCtx.messenger
    }

    abort(message: string) {
        if (this.status !== ExecuteStatus.EXECUTING) {
            return
        }
        this.activity?.abort(message);
    }

}



export function createInstance(config: IActivityConfig, options: ActivityFactoryOptions = {}) {
    const intance = new ActivityIntance(config, options)
    return intance;
}