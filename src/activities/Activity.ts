import _ from "lodash";
import { TerminateError } from "../ActivityError";
import {
    ACTIVITY_TASK_BUILTIN_PARAMS_KEYS,
    GLOBAL_TERMINATED,
    GLOBAL_TERMINATED_MESSAGE,
} from "../const";
import { EnumActivityStatus } from "../types/enum";
import {
    ExtendParams,
    IActivityExecuteParams,
    IActivityRunParams,
    IActivityTaskFunction,
} from "../types/activity";
import { extractOwnOtherKeys } from "../util";
import ActivityBase from "./ActivityBase";
import { replaceVariable } from "./util/variable";
import { createActivityError } from "./util";

/**
 * C context
 * R res
 * O options
 * ER IActivityRunParams 的扩展
 * EE IActivityExecuteParams 的扩展
 */
class Activity<
    C = any,
    R = any,
    O = any,
    ER extends ExtendParams = {},
    EE extends ExtendParams = {}
> extends ActivityBase<C, R, O, ER, EE> {
    constructor(ctx: C, public options: O) {
        super(ctx, options);
    }

    protected createActivityError = createActivityError;

    protected runBefore(paramObject: IActivityExecuteParams<ER, EE>): unknown {
        if (!this.before || !(this.before instanceof Activity)) {
            return;
        }
        return this.before.run(paramObject);
    }

    protected runAfter(paramObject: IActivityExecuteParams<ER, EE>): unknown {
        if (!this.after || !(this.after instanceof Activity)) {
            return;
        }
        return this.after.run(paramObject);
    }

    protected async runAssert(paramObject: IActivityExecuteParams<ER, EE>) {
        if (!this.assert || !(this.assert instanceof Activity)) {
            return true;
        }
        const res = await this.assert.run(paramObject);
        return !!res;
    }

    private getExecuteParamsObject(paramsObject: IActivityRunParams<ER>) {
        const { globalBuiltObject: gb, globalCtx } = this;
        let mContext = this.ctx || {};

        const extraExecuteParams = this.getExtraExecuteParams();
        const argObject: IActivityExecuteParams<ER, EE> = {
            $gCtx: globalCtx,
            $ctx: mContext,
            $c: gb.properties.properties,
            $m: gb.methods.properties,
            $v: this.globalVariables,
            $parent: this.parent,
            $res: undefined,
            $a: gb.activities.properties,
            ...paramsObject,
            ...extraExecuteParams,
        };
        return argObject;
    }

    /**
     *
     * @param {执行上下文} ctx
     * @param {上一次执行结果} preRes
     * @param {其他参数} otherParams
     */
    async run(
        paramsObject: IActivityRunParams<ER> = this
            .defaultTaskRunParam as IActivityRunParams<ER>
    ) {
        const { globalCtx, waiting } = this;
        // 如果已经终止
        if (globalCtx[GLOBAL_TERMINATED]) {
            return;
        }

        if (this.status < EnumActivityStatus.BUILDED) {
            this.build();
        }

        this.status = EnumActivityStatus.EXECUTING;
        const self = this;
        try {
            const argObject: IActivityExecuteParams<ER, EE> =
                this.getExecuteParamsObject(paramsObject);
            const needRun = await this.runAssert(argObject);
            if (!needRun) {
                return paramsObject.$preRes;
            }

            // 执行前
            await this.runBefore.call(self, argObject);

            // 可以不等待活动执行完毕，默认为true
            const res: R = waiting
                ? await this.task!.call(self, argObject)
                : this.task!.call(self, argObject);
            this.status = EnumActivityStatus.EXECUTED;

            // 执行后
            argObject.$preRes = res;
            const afterRes = await this.runAfter.call(self, argObject);

            if (this.type == "terminate") {
                globalCtx[GLOBAL_TERMINATED] = true;
                globalCtx[GLOBAL_TERMINATED_MESSAGE] = res as string;
                // 执行后
                throw new TerminateError(
                    res as string,
                    self as any as Activity
                );
            }
            return res === undefined ? afterRes : res;
        } catch (err) {
            self.status = EnumActivityStatus.EXCEPTION;
            throw this.createActivityError(err);
        }
    }

    getExtraExecuteParams(): EE {
        return {} as EE;
    }

    buildTask(...args: any[]): IActivityTaskFunction<ER, EE> {
        return () => {};
    }

    build(...args: any[]) {
        this.status = EnumActivityStatus.BUILDING;
        const task = this.buildTask(
            ...args
        ) as unknown as IActivityTaskFunction<ER, EE>;
        if (task) {
            this.task = task;
        }
        // @ts-ignore
        if (this.status !== EnumActivityStatus.BUILDED) {
            this.status = EnumActivityStatus.BUILDED;
        }
    }

    private getReplaceVariableParamKeys(mParamObject: IActivityRunParams<ER>) {
        const extraKeys = extractOwnOtherKeys(
            mParamObject,
            ACTIVITY_TASK_BUILTIN_PARAMS_KEYS
        ) as string[];
        return extraKeys.concat(extraKeys);
    }

    public getReplacedOptions(paramObj: IActivityExecuteParams<ER>) {
        return this.baseReplaceVariable(paramObj, this.options);
    }

    protected baseReplaceVariable<OT>(
        paramObj: IActivityExecuteParams<ER>,
        options: OT
    ) {
        if (options == undefined) {
            return options as OT;
        }
        const mParamObject: IActivityExecuteParams<ER, EE> =
            this.getExecuteParamsObject(paramObj);
        const extraKeys = this.getReplaceVariableParamKeys(mParamObject);
        return replaceVariable(options, {
            deep: this.isDeepReplace,
            replaceArray: this.isReplaceArray,
            extraKeys,
        }).call(this, mParamObject) as OT;
    }

    protected getProperty<P = any>(
        property: PropertyKey,
        recurse: boolean = false
    ): undefined | P {
        const context: any = this;
        if (context == null) {
            return undefined;
        }
        // TODO:: hasOwn ??
        const val = context[property];
        if (!recurse) {
            return val as P;
        }
        if (val !== undefined) {
            return val;
        }
        return this.getProperty.call(this.parent, property, recurse) as P;
    }

    getClosestParent<A = Activity>(targetActivity: Object): A | undefined {
        let act: Activity<any, any, any, any, any> | undefined = this;

        while (act != undefined) {
            if (act instanceof (targetActivity as any as Function)) {
                return act as A;
            }
            act = act.parent;
        }
        return undefined;
    }
}

export default Activity;
